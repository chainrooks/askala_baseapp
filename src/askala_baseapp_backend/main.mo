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

    public func updateOrCreateLessonMetadata(lesson: Types.LessonMetadataInput) : async () {
        let existingLessonOpt = await getLessonMetadataById(lesson.slug);

        switch (existingLessonOpt) {
            case (null) {
                await addLessonMetadata(lesson);
            };

            case (?existingLesson) {
                let updatedLesson: Types.LessonMetadata = {
                    id = existingLesson.id;
                    slug = lesson.slug;
                    title = lesson.title;
                    description = lesson.description;
                    tags = lesson.tags;
                    difficulty = lesson.difficulty;
                    estimatedTime = lesson.estimatedTime;
                    contentHash = lesson.contentHash;
                    version = lesson.version;
                    createdAt = existingLesson.createdAt; // Keep original creation date
                    updatedAt = Time.now(); // Update the last modified date
                };

                lessons := Array.map<Types.LessonMetadata, Types.LessonMetadata>(lessons, func (l) {
                    if (l.id == existingLesson.id) {
                        return updatedLesson;
                    } else {
                        return l;
                    }
                });
            };
        };
    };
    
    public query (message) func whoami() : async Principal {
        message.caller;
    };
        

    public shared func addUserProgress(lessonId: Text, userId: Principal, progress: Nat) : async () {
        let lessonMetadataOpt = await getLessonMetadataById(lessonId);

        switch (lessonMetadataOpt) {
            case (null) {
                return;
            };

            case (?lessonMetadata) {
                let _userProgress: Types.UserProgress = {
                    lessonId = lessonMetadata;
                    userId = { id = userId;}; 
                    progress = progress;
                    lastUpdated = Time.now();
                };
            };
        };        
    }; 
};
