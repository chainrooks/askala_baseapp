import Types "types";
import GenerateId "generate-id";
import Time "mo:base/Time";
import Array "mo:base/Array";

module {
     public class LearningService() {
        private var lessons : [Types.LessonMetadata] = [];
        private var userProgress : [Types.UserProgress] = [];
        
        /// Returns the lesson metadata if found, otherwise returns null.
        public func getLessonMetadataById(lessonId: Text) : ?Types.LessonMetadata {
            for (lesson in lessons.vals()) {
                if (lesson.id == lessonId) {
                    return ?lesson;
                }
            };
            return null;
        };

        /// Returns all lesson metadata stored in the service.
        public func getAllLessons() : [Types.LessonMetadata] {
            return lessons;
        };

        /// Adds a new lesson metadata entry to the lessons array.
        /// Generates a unique ID and timestamps for the lesson.
        public func addLessonMetadata(lesson: Types.LessonMetadataInput) : async () {        
            let entry: Types.LessonMetadata = {
                id = await GenerateId.generateId();
                slug = lesson.slug;
                title = lesson.title;
                description = lesson.description;
                code = lesson.code;                                          
                contentHash = lesson.contentHash;
                version = lesson.version;
                createdAt = Time.now();
                updatedAt = Time.now();
            };

            lessons := Array.append<Types.LessonMetadata>(lessons, [entry]);
        };

        /// Updates an existing lesson metadata by slug, or creates a new one if not found.
        /// Updates timestamps and lesson fields.
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
                        code = lesson.code;                                          
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

        /// Adds user progress for a specific lesson.
        /// Only adds progress if the lesson exists.
        public func addUserProgress(userProgressInput: Types.UserProgressInput) : async () {
            let lessonMetadataOpt = getLessonMetadataById(userProgressInput.lessonId);

            switch (lessonMetadataOpt) {
                case (null) {
                    return;
                };

                case (?lessonMetadata) {
                    let _userProgress: Types.UserProgress = {
                        lessonId = lessonMetadata;
                        userId = { id = userProgressInput.userId;}; 
                        progress = userProgressInput.progress;
                        lastUpdated = Time.now();
                    };

                    userProgress := Array.append<Types.UserProgress>(userProgress, [_userProgress]);
                };
            };        
        }; 
    }
}