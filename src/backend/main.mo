import Text "mo:base/Text";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Error "mo:base/Error";
import Blob "mo:base/Blob";
import Nat64 "mo:base/Nat64";
import Nat8 "mo:base/Nat8";
import Option "mo:base/Option";
import CourseType "types/CourseType";
import GenerateId "../shared/generate-id";
import ProgressType "types/ProgressType";
import IcpLedger "canister:icp_ledger_canister";
import AccountIdentifier "shared/account-identifier";

persistent actor AskalaBackend {

    // ==============
    // Stable Variables
    // ==============
    private var courseEntries: [CourseType.CourseMetadata] = [];    
    private var _userProgress : [ProgressType.UserProgress] = [];    

    // Paywall state
    private  var prices : [(Text, { e8s : Nat64 })] = []; // slug -> price
    private  var invoices : [CourseType.Invoice] = [];
    private  var entitlements : [CourseType.Entitlement] = [];
    private  var admins : [Principal] = [];
    private  var treasury : { owner : Principal; sub : ?IcpLedger.SubAccount } = {
        owner = Principal.fromText("aaaaa-aa"); sub = null
    };

    // ==============================
    // System Hooks
    // ==============================
    /// Called before upgrade. Use for logging or custom serialization if needed.
    system func preupgrade() {
        Debug.print("Starting preupgrade...");
    };

    /// Called after upgrade. Use for migrations or maintenance tasks.
    system func postupgrade() {
        Debug.print("Postupgrade completed");
    };

    // =================================================
    // SECTION: Types (Local Helper Types)
    // =================================================
     type Tokens = {
        e8s : Nat64;
    };

    type TransferArgs = {
        amount : Tokens;
        toPrincipal : Principal;
        toSubaccount : ?IcpLedger.SubAccount;
    };


    // =================================================
    // SECTION: Ledger Helpers (Transfer & Subaccount)
    // =================================================
    /// Transfer ICP from the default subaccount canister to the destination account.
    /// - Standard ledger fee: 10,000 e8s.
    /// - Returns #ok(blockIndex) if successful, #err(msg) if unsuccessful.
    public shared func transfer(args : TransferArgs) : async Result.Result<IcpLedger.BlockIndex, Text> {
        Debug.print(
        "Transferring "
        # debug_show (args.amount)
        # " tokens to principal "
        # debug_show (args.toPrincipal)
        # " subaccount "
        # debug_show (args.toSubaccount)
        );

        let transferArgs : IcpLedger.TransferArgs = {
        // can be used to distinguish between transactions
        memo = 0;
        // the amount we want to transfer
        amount = args.amount;
        // the ICP ledger charges 10_000 e8s for a transfer
        fee = { e8s = 10_000 };
        // we are transferring from the canisters default subaccount, therefore we don't need to specify it
        from_subaccount = null;
        // we take the principal and subaccount from the arguments and convert them into an account identifier
        to = Principal.toLedgerAccount(args.toPrincipal, args.toSubaccount);
        // a timestamp indicating when the transaction was created by the caller; if it is not specified by the caller then this is set to the current ICP time
        created_at_time = null;
        };

        try {
        // initiate the transfer
        let transferResult = await IcpLedger.transfer(transferArgs);

        // check if the transfer was successfull
        switch (transferResult) {
            case (#Err(transferError)) {
            return #err("Couldn't transfer funds:\n" # debug_show (transferError));
            };
            case (#Ok(blockIndex)) { return #ok blockIndex };
        };
        } catch (error : Error) {
        // catch any errors that might occur during the transfer
        return #err("Reject message: " # Error.message(error));
        };
    };

    // =================================================
    // SECTION: Admin Utilities
    // =================================================
    /// Check if the principal is an admin.
    func isAdmin(p : Principal) : Bool {
        for (a in admins.vals()) { if (a == p) return true };
        false
    };

    /// Utility: convert Nat64 to a 32-byte subaccount (big-endian on the first 8 bytes).
    func nat64ToSubaccount(n : Nat64) : IcpLedger.SubAccount {
        // 32 bytes, isi 8 byte high di depan, sisanya 0
        let arr = Array.tabulate<Nat8>(32, func (i : Nat) : Nat8 {
            if (i < 8) {
            // big-endian
            let shift = Nat64.fromNat(7 - i) * 8;
            Nat8.fromNat(Nat64.toNat((n >> shift) & 0xff));
            } else 0
        });
        Blob.fromArray(arr)
        };

    // =================================================
    // SECTION: Admin API
    // =================================================
    /// Initialize the first admin. Only successful if the admin list is empty.
    /// Returns `true` if the caller is set as the first admin; `false` if already set.
    public shared (msg) func bootstrapAdmin() : async Bool {
    if (admins.size() == 0) {
        admins := [msg.caller];
        return true;
    };
    return false;
    };

    /// Obtain a list of current principal administrators (for debugging/auditing)
    public query func getAdmins() : async [Principal] {
    admins
    };

    // =================================================
    // SECTION: Pricing (Admin-only)
    // =================================================
    /// Set the price for the slug course. If the slug already exists → overwrite; if not → append.
    public shared (msg) func setPrice(slug : Text, p : CourseType.CoursePrice) : async () {
        assert(isAdmin(msg.caller));
        var found = false;
        prices := Array.map<(Text, CourseType.CoursePrice), (Text, CourseType.CoursePrice)>(prices, func (kv) {
        if (kv.0 == slug) { found := true; (slug, p) } else kv
        });

        if (not found) { prices := Array.append(prices, [(slug, p)]) };
    };

     /// Take the price for the slug course (if any).
      public query func getPrice(slug : Text) : async ?CourseType.CoursePrice {
            for ((s, pr) in prices.vals()) { if (s == slug) return ?pr };
            null
        };

    /// Set treasury goals (principal + optional subaccount). Admin only.
    public shared (msg) func setTreasury(owner : Principal, sub : ?IcpLedger.SubAccount) : async () {
        assert(isAdmin(msg.caller));
        treasury := { owner; sub };
    };

      // =================================================
    // SECTION: Invoice Lifecycle (Create → Verify/Settle → Withdraw)
    // =================================================
    /// Create an invoice for `courseSlug`:
    /// - Create a unique subaccount from invoiceId (Nat64).
    /// - Return the AccountIdentifier (text) deposit that the user must pay.
    /// - Expired option (`expiresInSecs`) → save `expiresAt`.
  public shared (msg) func createInvoice(courseSlug : Text, expiresInSecs : ?Nat)
    : async { invoiceId : Nat64; amount : CourseType.CoursePrice; depositAccount : Text; subaccount : IcpLedger.SubAccount; expiresAt : ?Int }
  {
    let now = Time.now();
    let priceOpt = await getPrice(courseSlug);
    assert(priceOpt != null); // set dulu via setPrice
    let price = Option.get(priceOpt, { e8s = Nat64.fromNat(0) });

    // id: gabungan size + timestamp (sederhana, cukup unik untuk invoice)
    let newId = Nat64.fromNat(invoices.size()) ^ Nat64.fromIntWrap(now);
    let sub = nat64ToSubaccount(newId);

    let canisterPrincipal = Principal.fromActor(AskalaBackend);
    let aid : IcpLedger.AccountIdentifier = AccountIdentifier.fromPrincipal(canisterPrincipal, ?sub);
    let aidText : Text = AccountIdentifier.toText(aid);

    let inv : CourseType.Invoice = {
      id = newId;
      user = msg.caller;
      courseSlug = courseSlug;    
        amount = price; // gunakan CourseType.CoursePrice langsung
      subaccount = sub;
      createdAt = now;
      expiresAt = switch (expiresInSecs) { case (null) null; case (?s) ?(now + (s : Int) * 1_000_000_000) };
      status = #Pending;
    };
    invoices := Array.append(invoices, [inv]);

    {
      invoiceId = newId;
      amount = price;
      depositAccount = aidText;  // tampilkan ke user (dfx/Plug)
      subaccount = sub;
      expiresAt = inv.expiresAt;
    }
  };

    /// Verify the deposit on the invoice subaccount and mark it as #Paid if sufficient.
    /// - Do not transfer ICP (not yet withdrawn).
    /// - If successful, grant entitlement (lifetime: expiresAt = null).
  public shared (_msg) func verifyAndSettle(invoiceId : Nat64) : async Result.Result<(), Text> {
    // find invoice
    var inv : ?CourseType.Invoice  = null;
    label search for (v in invoices.vals()) {
      if (v.id == invoiceId) { inv := ?v; break search };
    };
    switch (inv) {
      case (null) { return #err("Invoice not found") };
      case (?invoice) {
        if (invoice.status != #Pending) return #err("Invoice not pending");
        if (invoice.expiresAt != null and Option.get(invoice.expiresAt, 0) < Time.now()) return #err("Invoice expired");

        let canisterPrincipal = Principal.fromActor(AskalaBackend);
        let aid = AccountIdentifier.fromPrincipal(canisterPrincipal, ?invoice.subaccount);

        // cek saldo di subaccount invoice
        let bal = await IcpLedger.account_balance({ account = aid });

        if (bal.e8s < invoice.amount.e8s) {
          return #err("Insufficient deposit");
        };

        // mark paid
        invoices := Array.map<CourseType.Invoice , CourseType.Invoice >(invoices, func (x) { if (x.id == invoiceId) { { x with status = #Paid } } else x });

        // grant entitlement (lifetime; bisa diubah ke durasi)
        entitlements := Array.append(entitlements, [{
          user = invoice.user;
          courseId = invoice.courseSlug;
          expiresAt = null;
        }]);

        return #ok(());
      }
    }
  };

    // =================================================
    // SECTION: Revenue & Access Query
    // =================================================
    /// Total revenue (e8s) from all invoices with status #Paid (gross, before deducting fees).
      public query func getTotalRevenue() : async Nat64 {
            var total : Nat64 = 0;
            for (inv in invoices.vals()) {
                switch (inv.status) {
                case (#Paid) { total += inv.amount.e8s };
                case (_) {};
                };
            };
            total
        };

    /// Total revenue (e8s) for a specific course (slug) from invoice #Paid.
    public query func getRevenueByCourse(slug: Text) : async Nat64 {
        var total : Nat64 = 0;
        for (inv in invoices.vals()) {
            if (inv.courseSlug == slug and inv.status == #Paid) {
            total += inv.amount.e8s;
            };
        };
        total
        };

    /// Check whether `user` has access to `courseSlug` (lifetime or not expired).
    public query func hasAccess(user : Principal, courseSlug : Text) : async Bool {
        for (e in entitlements.vals()) {
        if (e.user == user and e.courseId == courseSlug) {
            switch (e.expiresAt) {
            case (null) return true;
            case (?t) { if (t >= Time.now()) return true };
            }
        }
        };
        false
    };

    // =================================================
    // SECTION: Withdrawal (Admin-only)
    // =================================================
    /// Withdraw ICP funds from the subaccount invoice that has been #Paid to the designated treasury.
    /// - Using a standard fee of 10,000 e8s
    /// - Source of funds: `from_subaccount = invoice.subaccount`
    public shared (msg) func withdrawInvoice(invoiceId : Nat64) : async Result.Result<IcpLedger.BlockIndex, Text> {
        assert(isAdmin(msg.caller));

        var inv : ?CourseType.Invoice = null;
        label search for (v in invoices.vals()) { if (v.id == invoiceId) { inv := ?v; break search } };
        switch (inv) {
        case (null) { return #err("Invoice not found") };
        case (?invoice) {
            if (invoice.status != #Paid) return #err("Invoice not paid");

            let toAid = AccountIdentifier.fromPrincipal(treasury.owner, treasury.sub);

            let tx : IcpLedger.TransferArgs = {
            memo = 0;
            amount = { e8s = invoice.amount.e8s };
            fee = { e8s = 10_000 };
            from_subaccount = ?invoice.subaccount; // tarik dari subaccount invoice
            to = toAid;
            created_at_time = null;
            };

            try {
            let r = await IcpLedger.transfer(tx);
            switch r {
                case (#Ok(bi)) return #ok(bi);
                case (#Err(e)) return #err("Transfer failed " # debug_show(e));
            }
            } catch (err) {
            return #err("Reject: " # Error.message(err));
            };
        }
        }
    };



    // =================================================
    // SECTION: Course Service (CRUD)
    // =================================================
    /// Get course by ID (unique identifier).
    public shared query func getCourseById(id: Text) : async ?CourseType.CourseMetadata {                    
        for (course in courseEntries.vals()) {
            if (course.id == id) {
                return ?course;
            };
        };

        return null;
    };

    /// Get course by slug (unique identifier).
    public shared query func getCourseBySlug(slug: Text) : async ?CourseType.CourseMetadata {
        for (course in courseEntries.vals()) {
            if (course.slug == slug) {
                return ?course;
            };
        };

        return null;
    };

    /// Get All Courses (list of metadata).
    public shared query func getAllCourses() : async [CourseType.CourseMetadata] {
        return courseEntries;
    };

    /// Create a new course (generate ID + timestamp).
    public func createCourse(course: CourseType.CourseMetadataInput): async CourseType.CourseMetadata {
        let now = Time.now();

        let entry: CourseType.CourseMetadata= { 
            id = await GenerateId.generateId();
            slug = course.slug;
            title = course.title;
            description = course.description;
            code = course.code;
            contentHash = course.contentHash;
            version = course.version;
            createdAt = now;
            updatedAt = now;
        };

        courseEntries := Array.append<CourseType.CourseMetadata>(courseEntries, [entry]);

        return entry;
    };

    /// Update course based on ID (bump updatedAt).
    public func updateCourse(course: CourseType.CourseMetadata): async CourseType.CourseMetadata {
        let now = Time.now();
        let updatedCourse: CourseType.CourseMetadata = {
            id = course.id;
            slug = course.slug;
            title = course.title;
            description = course.description;
            code = course.code;
            contentHash = course.contentHash;
            version = course.version;
            createdAt = course.createdAt;
            updatedAt = now;
        };

        courseEntries := Array.map<CourseType.CourseMetadata, CourseType.CourseMetadata>    
        (courseEntries, func (c: CourseType.CourseMetadata) : CourseType.CourseMetadata {
            if (c.id == course.id) {
                return updatedCourse;
            } else {
                return c;
            }
        });

        return updatedCourse;
    };

    /// Upsert course based on slug (create new if does not exist, update if exists).
    public func updateOrCreateCourse(course: CourseType.CourseMetadataInput): async () {
        let existingCourseOpt = await getCourseBySlug(course.slug);

        switch (existingCourseOpt) {
            case null {
                ignore await createCourse(course);
            };
            case (?existingCourse) {
                let updatedCourse: CourseType.CourseMetadata = {
                    id = existingCourse.id;
                    slug = course.slug;
                    title = course.title;
                    description = course.description;
                    code = course.code;
                    contentHash = course.contentHash;
                    version = course.version;
                    createdAt = existingCourse.createdAt;
                    updatedAt = Time.now();
                };

                courseEntries := Array.map<CourseType.CourseMetadata, CourseType.CourseMetadata>(courseEntries, func(c: CourseType.CourseMetadata) : CourseType.CourseMetadata {
                    if (c.id == existingCourse.id) {
                        return updatedCourse;
                    } else {
                        return c;
                    }
                });
            };
        };
    };

    /// Bulk upsert multiple courses (calling updateOrCreateCourse for each item).
    public func bulkUpdateOrCreateCourse(courses: [CourseType.CourseMetadataInput]) : async () {
        for (course in courses.vals()) {
            await updateOrCreateCourse(course);
        };
    };


    // =================================================
    // SECTION: Progress Service
    // =================================================

    /// Adds user progress notes for a specific course (if courseId is valid).
    public shared func addUserProgress(userProgressInput: ProgressType.UserProgressInput) : async () {
        let lessonMetadataOpt = await getCourseById(userProgressInput.courseId);

        switch (lessonMetadataOpt) {
            case (null) {
                return;
            };

            case (?lessonMetadata) {
                let userProgressData: ProgressType.UserProgress = {
                    courseId = lessonMetadata.id;
                    userId = userProgressInput.userId;
                    progress = userProgressInput.progress;
                    lastUpdated = Time.now();
                };

                _userProgress := Array.append<ProgressType.UserProgress>(_userProgress, [userProgressData]);
            };
        };
    };

    /// Retrieve user progress for (userId, courseId) if available.
    public func getUserProgress(userProgressInput: ProgressType.GetUserProgressInput) : async ?ProgressType.UserProgress {
        for (progress in _userProgress.vals()) {
            if (progress.userId == userProgressInput.userId and progress.courseId == userProgressInput.courseId) {
                return ?progress;
            };
        };

        return null;
    };

    // =================================================
    // SECTION: User Service (Utility)
    // =================================================
    /// Returns the current principal caller.
    public query (message) func whoami() : async Principal {
        message.caller;
    };
}