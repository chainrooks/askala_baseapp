import Principal "mo:base/Principal";
import Types "types";
import LearningModule "LearningModule";

 actor {
        private let learningService = LearningModule.LearningService();

    public query func getLessonMetadataById(lessonId: Text) : async ?Types.LessonMetadata {
        learningService.getLessonMetadataById(lessonId);
    };

    public query func getAllLessons() : async [Types.LessonMetadata] {
        learningService.getAllLessons();
    };

    public func addLessonMetadata(lesson: Types.LessonMetadataInput) : async () {        
        await learningService.addLessonMetadata(lesson);
    };

    public func updateOrCreateLessonMetadata(lesson: Types.LessonMetadataInput) : async () {
        await learningService.updateOrCreateLessonMetadata(lesson);
    };
    
    public query (message) func whoami() : async Principal {
        message.caller;
    };
        
    public shared func addUserProgress(lessonId: Text, userId: Principal, progress: Nat) : async () {
        await learningService.addUserProgress(lessonId, userId, progress);
    }; 
};
