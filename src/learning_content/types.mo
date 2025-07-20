import Time "mo:base/Time";

module {
        public type LessonMetadataInput = {
        slug: Text;
        title: Text;
        description: Text;
        code: Text;
        contentHash: Text;
        version: Text;
    };

    public type LessonMetadata = {
        id: Text;
        slug: Text;
        title: Text;
        description: Text;
        code: Text;
        contentHash: Text;
        version: Text;
        createdAt: Time.Time;
        updatedAt: Time.Time;
    };
}