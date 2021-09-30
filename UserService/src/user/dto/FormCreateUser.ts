import {UserRole} from "../enum/userrole.enum";
import {User} from "../entities/user.entity";

export class FormCreateUser {

    userName: string;

    password: string;

    role: UserRole;

    static toEntity(createUser: FormCreateUser): User {
        const user = new User();
        if (createUser.userName) user.userName = createUser.userName;
        if (createUser.password) user.password = createUser.password;
        if (createUser.role) user.role = createUser.role;
        return user;
    }
}