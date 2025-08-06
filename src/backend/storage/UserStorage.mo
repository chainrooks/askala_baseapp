import UserType "../types/UserType";

module UserStorage {
    type User = UserType.User;

    public class UserStorage() {

        private var _users : [UserType.User] = [];

        // public func create(user: User): async User {            
        //     _users := _users # [user];

        //     return user;
        // };

    };
}