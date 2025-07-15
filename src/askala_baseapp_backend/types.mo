import Time "mo:base/Time";

module {
    public type LessonMetadataInput = {
        slug: Text;
        title: Text;
        description: Text;
        tags: [Text];
        difficulty: Text;
        estimatedTime: Nat;
        contentHash: Text;
        version: Nat;
    };

    public type LessonMetadata = {
        id: Text;
        slug: Text;
        title: Text;
        description: Text;
        tags: [Text];
        difficulty: Text;
        estimatedTime: Nat;
        contentHash: Text;
        version: Nat;
        createdAt: Time.Time;
        updatedAt: Time.Time;
    };
}
