import Time "mo:base/Time";
import Array "mo:base/Array";
import Types "types";
import GenerateId "generate-id";

actor {
    stable var lessons : [Types.LessonMetadata] = [];

    public query func getLessonMetadataById(lessonId: Text) : async ?Types.LessonMetadata {
        for (lesson in lessons.vals()) {
            if (lesson.id == lessonId) {
                return ?lesson;
            }
        };
        
        return null;
    };

    public query func getAllLessons() : async [Types.LessonMetadata] {
        return lessons;
    };

    public func addLessonMetadata(lesson: Types.LessonMetadataInput) : async () {        
        let entry: Types.LessonMetadata = {
            id = await GenerateId.generateId();
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

           lessons := Array.append<Types.LessonMetadata>(lessons, [entry]);
    };
};
