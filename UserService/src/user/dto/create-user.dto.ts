import {UserRole} from "../enum/userrole.enum";

export class CreateUserDto {

    userName: string;

    password: string;

    role: UserRole;
}
