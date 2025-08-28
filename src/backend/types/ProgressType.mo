import Principal "mo:base/Principal";
import Time "mo:base/Time";

module ProgressType {
    public type UserProgress = {        
        courseId: Text;        
        userId: Principal;
        progress: Nat;
        lastUpdated: Time.Time;
    };

    public type UserProgressInput = {
        courseId: Text;
        userId: Principal;
        progress: Nat;
    };

    public type GetUserProgressInput = {
        courseId: Text;
        userId: Principal;        
    };
}