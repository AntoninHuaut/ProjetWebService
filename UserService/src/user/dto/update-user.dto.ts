import {UserRole} from "../enum/userrole.enum";

export class UpdateUserDto {

    id: number;

    password: string;

    role: UserRole
}
