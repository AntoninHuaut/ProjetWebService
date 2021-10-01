import {UserRole} from "../../user/enum/userrole.enum";
import {User} from "../../user/entities/user.entity";

export class ResponseUserLogin {

    userId: number;

    userName: string;

    role: UserRole;

    token: string;

    static fromEntity(user: User): ResponseUserLogin{
        const responseUser = new ResponseUserLogin();
        responseUser.userId = user.userId;
        responseUser.userName = user.userName;
        responseUser.role = user.role;
        responseUser.token = user.token;
        return responseUser;
    }
}