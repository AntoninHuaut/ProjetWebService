import {PartialType} from '@nestjs/mapped-types';
import {CreateUserDto} from './create-user.dto';
import {UserRole} from "../enum/userrole.enum";

export class UpdateUserDto extends PartialType(CreateUserDto) {

    id: number;

    password: string;

    role: UserRole;
}
