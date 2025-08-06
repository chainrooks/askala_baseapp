import Text "mo:base/Text";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Debug "mo:base/Debug";
import CourseType "types/CourseType";
import GenerateId "../shared/generate-id";
import ProgressType "types/ProgressType";


persistent actor AskalaBackend {

    // ==============
    // Stable Variables
    // ==============
    private var courseEntries: [CourseType.CourseMetadata] = [];    
    private var _userProgress : [ProgressType.UserProgress] = [];

    // ===== System Functions for Upgrades =====
    system func preupgrade() {
        Debug.print("Starting preupgrade...");
    };

    system func postupgrade() {
        Debug.print("Postupgrade completed");
    };

    // ====== Course Service ======
    public shared query func getCourseById(id: Text) : async ?CourseType.CourseMetadata {                    
        for (course in courseEntries.vals()) {
            if (course.id == id) {
                return ?course;
            };
        };

        return null;
    };

    public shared query func getCourseBySlug(slug: Text) : async ?CourseType.CourseMetadata {
        for (course in courseEntries.vals()) {
            if (course.slug == slug) {
                return ?course;
            };
        };

        return null;
    };

    public shared query func getAllCourses() : async [CourseType.CourseMetadata] {
        return courseEntries;
    };

    public func createCourse(course: CourseType.CourseMetadataInput): async CourseType.CourseMetadata {
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

        courseEntries := Array.append<CourseType.CourseMetadata>(courseEntries, [entry]);

        return entry;
    };

    public func updateCourse(course: CourseType.CourseMetadata): async CourseType.CourseMetadata {
        let now = Time.now();
        let updatedCourse: CourseType.CourseMetadata = {
            id = course.id;
            slug = course.slug;
            title = course.title;
            description = course.description;
            code = course.code;
            contentHash = course.contentHash;
            version = course.version;
            createdAt = course.createdAt;
            updatedAt = now;
        };

        courseEntries := Array.map<CourseType.CourseMetadata, CourseType.CourseMetadata>
        (courseEntries, func (c: CourseType.CourseMetadata) : CourseType.CourseMetadata {
            if (c.id == course.id) {
                return updatedCourse;
            } else {
                return c;
            }
        });

        return updatedCourse;
    };

    public func updateOrCreateCourse(course: CourseType.CourseMetadataInput): async () {
        let existingCourseOpt = await getCourseBySlug(course.slug);

        switch (existingCourseOpt) {
            case null {
                ignore await createCourse(course);
            };
            case (?existingCourse) {
                let updatedCourse: CourseType.CourseMetadata = {
                    id = existingCourse.id;
                    slug = course.slug;
                    title = course.title;
                    description = course.description;
                    code = course.code;
                    contentHash = course.contentHash;
                    version = course.version;
                    createdAt = existingCourse.createdAt;
                    updatedAt = Time.now();
                };

                courseEntries := Array.map<CourseType.CourseMetadata, CourseType.CourseMetadata>(courseEntries, func(c: CourseType.CourseMetadata) : CourseType.CourseMetadata {
                    if (c.id == existingCourse.id) {
                        return updatedCourse;
                    } else {
                        return c;
                    }
                });
            };
        };
    };

    public func bulkUpdateOrCreateCourse(courses: [CourseType.CourseMetadataInput]) : async () {
        for (course in courses.vals()) {
            await updateOrCreateCourse(course);
        };
    };

    // ===== Progress Service ======
    public shared func addUserProgress(userProgressInput: ProgressType.UserProgressInput) : async () {
        let lessonMetadataOpt = await getCourseById(userProgressInput.courseId);

        switch (lessonMetadataOpt) {
            case (null) {
                return;
            };

            case (?lessonMetadata) {
                let userProgressData: ProgressType.UserProgress = {
                    courseId = lessonMetadata.id;
                    userId = userProgressInput.userId;
                    progress = userProgressInput.progress;
                    lastUpdated = Time.now();
                };

                _userProgress := Array.append<ProgressType.UserProgress>(_userProgress, [userProgressData]);
            };
        };
    };

    public func getUserProgress(userProgressInput: ProgressType.GetUserProgressInput) : async ?ProgressType.UserProgress {
        for (progress in _userProgress.vals()) {
            if (progress.userId == userProgressInput.userId and progress.courseId == userProgressInput.courseId) {
                return ?progress;
            };
        };

        return null;
    };

    // ===== User Service ======
    public query (message) func whoami() : async Principal {
        message.caller;
    };
}