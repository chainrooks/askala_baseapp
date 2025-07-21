import Types "../backend/types";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";

actor UserManagement {
    // Private state (hanya bisa diakses oleh actor ini)
    private stable var users : [(Principal, Types.User)] = [];
    private var userMap = HashMap.HashMap<Principal, Types.User>(10, Principal.equal, Principal.hash);

    // System functions untuk upgrade
    system func preupgrade() {
        users := Iter.toArray(userMap.entries());
    };

    system func postupgrade() {
        users := [];
    };

    // Public interface - ini yang bisa dipanggil actor lain
    // public shared(msg) func createUser(profile: Types.User) : async Result.Result<Principal, Text> {
    //     let caller = msg.caller;

    //     return caller;
    // };

    public query func getUser(userId : Principal) : async ?Types.User {
        userMap.get(userId);
    };

    public query (message) func whoami() : async Principal {
        message.caller;
    };
};
