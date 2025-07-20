import Time "mo:base/Time";
import Types "../user_management/types";

module {
        public type LessonMetadataInput = {
        slug: Text;
        title: Text;
        description: Text;
        code: Text;
        contentHash: Text;
        version: Text;
    };

    public type LessonMetadata = {
        id: Text;
        slug: Text;
        title: Text;
        description: Text;
        code: Text;
        contentHash: Text;
        version: Text;
        createdAt: Time.Time;
        updatedAt: Time.Time;
    };

    public type UserProgress = {
        lessonId: LessonMetadata;
        userId: Types.User;
        progress: Nat;
        lastUpdated: Time.Time;
    };
}