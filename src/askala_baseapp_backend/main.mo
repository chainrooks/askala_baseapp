import Principal "mo:base/Principal";
import LearningModule "LearningModule";
import Types "types";
import GenerateId "generate-id";
import Time "mo:base/Time";
import Array "mo:base/Array";

 actor {
    stable var _lessons : [Types.LessonMetadata] = [];
    stable var _userProgress : [Types.UserProgress] = [];
    
    /// Returns the lesson metadata if found, otherwise returns null.
    public query func getLessonMetadataById(lessonId: Text) : async ?Types.LessonMetadata {
        for (lesson in _lessons.vals()) {
                if (lesson.id == lessonId) {
                    return ?lesson;
                }
            };

        return null;
    };

    /// Returns all lesson metadata stored in the service.
    public query func getAllLessons() : async [Types.LessonMetadata] {
            return _lessons;
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

            _lessons := Array.append<Types.LessonMetadata>(_lessons, [entry]);
    };

    /// Updates an existing lesson metadata by slug, or creates a new one if not found.
    /// Updates timestamps and lesson fields.
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
                        code = lesson.code;                                          
                        contentHash = lesson.contentHash;
                        version = lesson.version;
                        createdAt = existingLesson.createdAt;
                        updatedAt = Time.now();
                    };

                    _lessons := Array.map<Types.LessonMetadata, Types.LessonMetadata>(_lessons, func (l) {
                        if (l.id == existingLesson.id) {
                            return updatedLesson;
                        } else {
                            return l;
                        }
                    });
                };
            };
    };

    public func bulkUpdateOrCreateLessonMetadata(lessonsInput: [Types.LessonMetadataInput]) : async () {
        for (lesson in lessonsInput.vals()) {
            await updateOrCreateLessonMetadata(lesson);
        };
    };

    
    public query (message) func whoami() : async Principal {
        message.caller;
    };
        
    /// Adds user progress for a specific lesson.
    /// Only adds progress if the lesson exists.
    public shared func addUserProgress(userProgressInput: Types.UserProgressInput) : async () {
          let lessonMetadataOpt = await getLessonMetadataById(userProgressInput.lessonId);

            switch (lessonMetadataOpt) {
                case (null) {
                    return;
                };

                case (?lessonMetadata) {
                    let userProgressData: Types.UserProgress = {
                        lessonId = lessonMetadata;
                        userId = { id = userProgressInput.userId;}; 
                        progress = userProgressInput.progress;
                        lastUpdated = Time.now();
                    };

                    _userProgress := Array.append<Types.UserProgress>(_userProgress, [userProgressData]);
                };
            };        
    }; 
};
