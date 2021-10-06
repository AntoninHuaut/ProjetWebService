import {ForbiddenException, Injectable} from '@nestjs/common';
import {Action} from "./entities/action.enum";
import {User} from "../user/entities/user.entity";
import {UserRole} from "../user/enum/userrole.enum";
import {UserService} from "../user/user.service";
import {LoginUserDto} from "./dto/login-user-dto";
import {randomStringGenerator} from "@nestjs/common/utils/random-string-generator.util";
import {ResponseUserLogin} from "./dto/ResponseUserLogin";

@Injectable()
export class AccessService {

    constructor(private userService: UserService) {
    }

    async login(loginUserDto: LoginUserDto) {
        const user: User = await this.userService.checkPassword(loginUserDto.userName, loginUserDto.password);
        user.token = randomStringGenerator() + "-" + randomStringGenerator();
        await this.userService.updateToken(user.userId, user.token);
        return ResponseUserLogin.fromEntity(user);
    }

    async canDo(action: Action, token: string) {
        let user: User
        try {
            user = await this.userService.findOneWithToken(token);
        } catch (_ignore) {
            throw new ForbiddenException();
        }

        switch (action) {
            case Action.CONSULT:
                return AccessService.checkCanDo(user.role, UserRole.CONSULT_ROLE);

            case Action.CREATE_CONSULT_USER:
                return AccessService.checkCanDo(user.role, UserRole.BORROW_ROLE);
            case Action.MANAGE_BORROW:
                return AccessService.checkCanDo(user.role, UserRole.BORROW_ROLE);

            case Action.MANAGE_BOOK_PUBLISHER_AUTHOR:
                return AccessService.checkCanDo(user.role, UserRole.CONTRIBUTOR_ROLE);

            case Action.MANAGE_USER:
                return AccessService.checkCanDo(user.role, UserRole.ADMINISTRATOR_ROLE);

            default:
                throw new ForbiddenException();
        }
    }

    private static checkCanDo(userRole: UserRole, minRole: UserRole): boolean {
        if (userRole && userRole >= minRole) {
            return true;
        }
        throw new ForbiddenException();
    }
}
