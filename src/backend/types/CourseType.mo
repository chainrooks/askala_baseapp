import Time "mo:base/Time";
import Nat64 "mo:base/Nat64";
import IcpLedger "canister:icp_ledger_canister";

module CourseType{
    public type CourseMetadataInput = {
        slug: Text;
        title: Text;
        description: Text;
        code: Text;
        contentHash: Text;
        version: Text;
        is_premium: Bool; // true = premium, false = free
    };

    public type CourseMetadata = {
        id: Text;
        slug: Text;
        title: Text;
        description: Text;
        code: Text;
        contentHash: Text;
        version: Text;       
        is_premium: Bool; // true = premium, false = free 
        createdAt: Time.Time;
        updatedAt: Time.Time;
    };

    public type CoursePrice = {
        e8s: Nat64;        
    };

    public type InvoiceStatus = { #Pending; #Paid; #Expired; #Refunded };

    public type Invoice = {
            id          : Nat64;
            user        : Principal;              // caller yang membuat invoice
            courseSlug  : Text;
            amount      : CoursePrice;
            subaccount  : IcpLedger.SubAccount;   // 32-bytes
            createdAt   : Int;
            expiresAt   : ?Int;
            status      : InvoiceStatus;
        };

    public type Entitlement = {
        user      : Principal;
        courseId  : Text; // atau pakai id Text seperti di CourseMetadata.id
        expiresAt : ?Int; // null = lifetime
    };
};