import Time "mo:base/Time";

module {
    public type User = {
        id : Principal;		
    };

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
        userId: User;
        progress: Nat;
        lastUpdated: Time.Time;
    };

    public type UserProgressInput = {
        lessonId: Text;
        userId: Principal;
        progress: Nat;
    };
}
