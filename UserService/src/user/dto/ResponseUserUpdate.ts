import {UserRole} from "../enum/userrole.enum";
import {User} from "../entities/user.entity";

export class ResponseUserUpdate {

    userId: number;

    userName: string;

    role: UserRole;

    static fromEntity(user: User): ResponseUserUpdate {
        const responseUser = new ResponseUserUpdate();
        responseUser.userId = user.userId;
        responseUser.userName = user.userName;
        responseUser.role = user.role;
        return responseUser;
    }
}