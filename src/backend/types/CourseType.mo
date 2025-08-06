import Time "mo:base/Time";

module CourseType{
    public type CourseMetadataInput = {
        slug: Text;
        title: Text;
        description: Text;
        code: Text;
        contentHash: Text;
        version: Text;
    };

    public type CourseMetadata = {
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
};