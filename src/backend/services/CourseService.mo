import CourseType "../types/CourseType";
import CourseStorage "../storage/CourseStorage";


module CourseService {
    type Course = CourseType.CourseMetadata;    

    public class CourseManager() {
        private let storage = CourseStorage.CourseStorage();

        // System functions for upgrades
        public func preupgrade() : [(Text, Course)] {
            storage.preupgrade();
        };

        public func postupgrade(entries : [(Text, Course)]) {
            storage.postupgrade(entries);
        };

        public func getById(id: Text) : async ?Course {            
            return await storage.getById(id);
        };

        public func getAllCourses() : async [Course] {
            return await storage.getAllCourses();
        };

        public func create(course: CourseType.CourseMetadataInput): async CourseType.CourseMetadata {
            return await storage.create(course);
        };

        public func update(course: Course): async ?Course {
            return await storage.update(course);
        };
    }
}