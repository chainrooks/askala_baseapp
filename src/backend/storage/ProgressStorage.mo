import ProgressType "../types/ProgressType";
import Time "mo:base/Time";
import Map "mo:base/HashMap";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";

module ProgressStorage {
    type UserProgress = ProgressType.UserProgress;
    type UserProgressInput = ProgressType.UserProgressInput;
    type Key = (Text, Principal); // (courseId, userId)

    public class ProgressStorage() {
        // Map untuk pencarian cepat
        private var _progresses = Map.HashMap<Key, UserProgress>(10, func ((a1, a2), (b1, b2)) = a1 == b1 and a2 == b2, 
                                                                   func ((a, b)) = Text.hash(a) + Principal.hash(b));

        // Untuk simpan sebelum upgrade
        public func preupgrade() : [(Key, UserProgress)] {
            Iter.toArray(_progresses.entries());
        };

        public func postupgrade(entries: [(Key, UserProgress)]) {
            _progresses := Map.fromIter<Key, UserProgress>(entries.vals(), entries.size(),
                            func ((a1, a2), (b1, b2)) = a1 == b1 and a2 == b2,
                            func ((a, b)) = Text.hash(a) + Principal.hash(b));
        };

        // Get by courseId and userId
        public shared query func getByLessonAndUser(courseId: Text, userId: Principal) : async ?UserProgress {
            _progresses.get((courseId, userId));
        };

        // Get all
        public query func getAllProgresses() : async [UserProgress] {
            Iter.toArray(_progresses.vals());
        };

        // Create or update progress
        public func createOrUpdate(progress: UserProgressInput): async UserProgress {
            let now = Time.now();
            let key = (progress.courseId, progress.userId);

            let entry: UserProgress = {
                courseId = progress.courseId;
                userId = progress.userId;
                progress = progress.progress;
                lastUpdated = now;
            };

            _progresses.put(key, entry);
            return entry;
        };
    };
}