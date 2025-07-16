import Types "types";
import GenerateId "generate-id";
import Time "mo:base/Time";
import Array "mo:base/Array";

module {
     public class LearningService() {
        private var lessons : [Types.LessonMetadata] = [];
        private var userProgress : [Types.UserProgress] = [];

        public func getLessonMetadataById(lessonId: Text) : ?Types.LessonMetadata {
            for (lesson in lessons.vals()) {
                if (lesson.id == lessonId) {
                    return ?lesson;
                }
            };
            return null;
        };

        public func getAllLessons() : [Types.LessonMetadata] {
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
            let existingLessonOpt = getLessonMetadataById(lesson.slug);

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
                        createdAt = existingLesson.createdAt;
                        updatedAt = Time.now();
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

        public func addUserProgress(lessonId: Text, userId: Principal, progress: Nat) : async () {
            let lessonMetadataOpt = getLessonMetadataById(lessonId);

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

                    userProgress := Array.append<Types.UserProgress>(userProgress, [_userProgress]);
                };
            };        
        }; 
    }
}