import Types "../learning_content/types";
import TypesUser "../user_management/types";
import Time "mo:base/Time";

module {
    public type UserProgress = {
        lessonId: Types.LessonMetadata;
        userId: TypesUser.User;
        progress: Nat;
        lastUpdated: Time.Time;
    };

    public type UserProgressInput = {
        lessonId: Text;
        userId: Principal;
        progress: Nat;
    };
}