import Debug "mo:base/Debug";
import Types "../types";
import LearningModule "../LearningModule";

let service = LearningModule.LearningService();

// Test getting all lessons initially (should be empty)
let initialLessons = service.getAllLessons();
assert(initialLessons.size() == 0);

// Test adding a lesson
let sampleLesson: Types.LessonMetadataInput = {
    slug = "test-lesson";
    title = "Test Lesson";
    description = "A test lesson";
    tags = ["test"];
    difficulty = "easy";
    estimatedTime = 30;
    contentHash = "abc123";
    version = 1;
};

// Note: This test assumes GenerateId.generateId() works in test environment
// You might need to mock this function
await service.addLessonMetadata(sampleLesson);

// Test getting all lessons after adding one
let lessonsAfterAdd = service.getAllLessons();
assert(lessonsAfterAdd.size() == 1);

// Test getting lesson by ID
let addedLesson = lessonsAfterAdd[0];
let retrievedLesson = service.getLessonMetadataById(addedLesson.id);
assert(retrievedLesson != null);

switch (retrievedLesson) {
    case (?lesson) {
        assert(lesson.title == "Test Lesson");
        assert(lesson.slug == "test-lesson");
    };
    case (null) {
        assert(false); // Should not happen
    };
};

Debug.print("All tests passed!");