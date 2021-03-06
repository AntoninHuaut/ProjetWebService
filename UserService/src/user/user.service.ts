import * as bcrypt from 'bcrypt';
import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
    NotFoundException
} from '@nestjs/common';
import {UserRepository} from './dto/user.repository';
import {InjectRepository} from "@nestjs/typeorm";
import {Like} from "typeorm";
import {User} from "./entities/user.entity";
import {UserUtil} from './enum/userrole.enum';
import {ResponseUserUpdate} from "./dto/ResponseUserUpdate";
import {FormCreateUser} from "./dto/FormCreateUser";
import {FormUpdateUser} from "./dto/FormUpdateUser";

@Injectable()
export class UserService {

    private readonly saltOrRounds: number = 8;

    constructor(@InjectRepository(UserRepository) private usersRepository: UserRepository) {
    }

    async findAll(name: string) {
        if (name != undefined) {
            return await this.usersRepository.find({
                userName: Like(`%${name}%`)
            });
        }
        return await this.usersRepository.find();
    }

    async findOneWithToken(token: string) {
        if (!token) throw new NotFoundException();

        const userCheck = await this.usersRepository.findOne({
            token: token
        });
        if (userCheck) {
            return userCheck;
        } else {
            throw new NotFoundException();
        }
    }

    async findOneWithUsername(userName: string) {
        if (!userName) throw new NotFoundException();

        const userCheck = await this.usersRepository.findOne({
            userName: userName
        });
        if (userCheck) {
            return userCheck;
        } else {
            throw new NotFoundException();
        }
    }

    async findOne(id: number) {
        const userCheck = await this.usersRepository.findOne(id);
        if (userCheck) {
            return userCheck;
        } else {
            throw new NotFoundException();
        }
    }

    async create(createUserDto: FormCreateUser): Promise<ResponseUserUpdate> {
        if (!UserUtil.isValidRole(createUserDto.role)) throw new BadRequestException("Invalid role");

        let isExist: boolean;
        try {
            await this.findOneWithUsername(createUserDto.userName); // Can throw NotFoundException
            isExist = true;
        } catch (excepted) {
            isExist = false;
        }

        if (isExist) throw new BadRequestException("Username already exist");

        if (createUserDto.password) {
            createUserDto.password = await this.hash(createUserDto.password);
        }

        const userEntity = await this.saveUser(FormCreateUser.toEntity(createUserDto));
        return ResponseUserUpdate.fromEntity(userEntity);
    }

    async update(updateUserDto: FormUpdateUser): Promise<ResponseUserUpdate> {
        if (!UserUtil.isValidRole(updateUserDto.role)) throw new BadRequestException("Invalid role");

        const user: User = await this.findOne(updateUserDto.userId); // Can throw NotFoundException

        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, this.saltOrRounds);
        }

        const userEntity = await this.saveUser(FormUpdateUser.fromEntity(updateUserDto, user));
        return ResponseUserUpdate.fromEntity(userEntity);
    }

    async saveUser(user: User): Promise<User> {
        try {
            return await this.usersRepository.save(user);
        } catch (ex) {
            if (ex.name === 'QueryFailedError' && ex.message.includes('CONSTRAINT')) {
                throw new BadRequestException("Invalid data");
            }

            throw new InternalServerErrorException({
                error: ex.name,
                message: ex.message
            });
        }
    }

    // Internal use
    async updateToken(id: number, token: string): Promise<String> {
        const user: User = await this.findOne(id); // Can throw NotFoundException
        user.token = token;
        await this.usersRepository.save(user);
        return token;
    }

    async remove(id: number) {
        const userCheck = await this.findOne(id); // Can throw NotFoundException
        await this.usersRepository.delete(id);
        return userCheck;
    }

    async checkPassword(username: string, password: string): Promise<User> {
        const user: User = await this.findOneWithUsername(username);
        if (await bcrypt.compare(password, user.password)) {
            return user;
        }

        throw new ForbiddenException();
    }

    async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, this.saltOrRounds);
    }

    async deleteToken(token: string) {
        const user: User = await this.findOneWithToken(token);
        user.token = null;
        await this.usersRepository.save(user);
    }
}
