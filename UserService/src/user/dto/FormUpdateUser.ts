import {UserRole} from "../enum/userrole.enum";
import {User} from "../entities/user.entity";

export class FormUpdateUser {

    userId: number;

    password: string;

    role: UserRole;

    static fromEntity(createUser: FormUpdateUser, user: User): User {
        if (createUser.password) user.password = createUser.password;
        if (createUser.role) user.role = createUser.role;
        return user;
    }
}