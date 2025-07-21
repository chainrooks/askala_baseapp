import Types "types";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import LearningContent "canister:learning_content";
import Array "mo:base/Array";

actor ProgressActor {
    stable var _userProgress : [Types.UserProgress] = [];
    // Removed invalid learningContent declaration

    /// Adds user progress for a specific lesson.
    /// Only adds progress if the lesson exists.
    public shared func addUserProgress(userProgressInput : Types.UserProgressInput) : async () {
        let lessonMetadataOpt = await LearningContent.getLessonMetadataById(userProgressInput.lessonId);

        switch (lessonMetadataOpt) {
            case (null) {
                return;
            };

            case (?lessonMetadata) {
                let userProgressData : Types.UserProgress = {
                    lessonId = lessonMetadata;
                    userId = { id = userProgressInput.userId };
                    progress = userProgressInput.progress;
                    lastUpdated = Time.now();
                };

                _userProgress := Array.append<Types.UserProgress>(_userProgress, [userProgressData]);
            };
        };
    };

    public func getUserProgess(userProgressInput: Types.GetUserProgressInput) : async ?Types.UserProgress {
        for (progress in _userProgress.vals()) {
            if (Principal.equal(progress.userId.id, userProgressInput.userId) and progress.lessonId.id == userProgressInput.lessonId) {
                return ?progress;
            };
        };

        return null;
    };
};
