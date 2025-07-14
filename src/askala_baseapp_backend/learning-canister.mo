import Time "mo:base/Time";
import Array "mo:base/Array";

actor class LearningManager() {
    stable var lessons : [LessonMetadata] = [];

    type LessonMetadata = {
        id: Text;
        slug: Text;
        title: Text;
        description: Text;
        tags: [Text];
        difficulty: Text;
        estimatedTime: Nat;
        contentHash: Text;
        version: Nat;
        createdAt: Time.Time;
        updatedAt: Time.Time;
    };

    public query func getLessonMetadata(lessonId: Text) : async ?LessonMetadata {
        for (lesson in lessons.vals()) {
            if (lesson.id == lessonId) {
                return ?lesson;
            }
        };
        
        return null;
    };

    public func addLessonMetadata(lesson: LessonMetadata) : async () {        
        let entry: LessonMetadata = {
            id = lesson.id;
            slug = lesson.slug;
            title = lesson.title;
            description = lesson.description;
            tags = lesson.tags;
            difficulty = lesson.difficulty;
            estimatedTime = lesson.estimatedTime;
            contentHash = lesson.contentHash;
            version = lesson.version;
            createdAt = Time.now();
            updatedAt = Time.now();
        };

           lessons := Array.append<LessonMetadata>(lessons, [entry]);
    };
}