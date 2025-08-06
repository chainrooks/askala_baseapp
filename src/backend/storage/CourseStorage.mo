import CourseType "../types/CourseType";
import Time "mo:base/Time";
import Iter "mo:base/Iter";
import GenerateId "../shared/generate-id";
import Map "mo:base/HashMap";
import Text "mo:base/Text";

module CourseStorage {
    type Course = CourseType.CourseMetadata;
    type CourseInput = CourseType.CourseMetadataInput;

    public class CourseStorage() {        
        private var _courses = Map.HashMap<Text, Course>(10, Text.equal, Text.hash);

        // ====== UPGRADE SUPPORT ======
        public func preupgrade() : [(Text, Course)] {
            Iter.toArray(_courses.entries());
        };

        public func postupgrade(entries : [(Text, Course)]) {
            _courses := Map.fromIter<Text, Course>(entries.vals(), entries.size(), Text.equal, Text.hash);
        };
        

        public func getById(id: Text) : async ?Course {
            return _courses.get(id);
        };
        

        public query func getAllCourses() : async [Course] {
            Iter.toArray(_courses.vals());
        };

        public func create(course: CourseType.CourseMetadataInput): async CourseType.CourseMetadata {            
            let now = Time.now();

            let entry: CourseType.CourseMetadata= { 
                id = await GenerateId.generateId();
                slug = course.slug;
                title = course.title;
                description = course.description;
                code = course.code;
                contentHash = course.contentHash;
                version = course.version;
                createdAt = now;
                updatedAt = now;
            };

            _courses.put(entry.id, entry);
            return entry;
        };

        public func update(course: Course): async ?Course {
            switch (_courses.get(course.slug)) {
                case null { null };
                case (?existing) {
                    let updated: Course = {
                        id = existing.id;
                        slug = course.slug;
                        title = course.title;
                        description = course.description;
                        code = course.code;
                        contentHash = course.contentHash;
                        version = course.version;
                        createdAt = existing.createdAt;
                        updatedAt = Time.now();
                    };
                    _courses.put(course.slug, updated);
                    ?updated;
                };
            };
        };

        // ====== UPDATE OR CREATE ======
        public func updateOrCreate(course: CourseInput): async Course {
            let existing = _courses.get(course.slug);
            let now = Time.now();

            let finalCourse: Course = switch (existing) {
                case null {
                    {
                        id = await GenerateId.generateId();
                        slug = course.slug;
                        title = course.title;
                        description = course.description;
                        code = course.code;
                        contentHash = course.contentHash;
                        version = course.version;
                        createdAt = now;
                        updatedAt = now;
                    };
                };
                case (?existingCourse) {
                    {
                        id = existingCourse.id;
                        slug = course.slug;
                        title = course.title;
                        description = course.description;
                        code = course.code;
                        contentHash = course.contentHash;
                        version = course.version;
                        createdAt = existingCourse.createdAt;
                        updatedAt = now;
                    };
                };
            };

            _courses.put(course.slug, finalCourse);
            return finalCourse;
        };
    }
}