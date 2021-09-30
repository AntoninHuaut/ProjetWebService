import * as bcrypt from 'bcrypt';
import {BadRequestException, ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {UserRepository} from './dto/user.repository';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";

@Injectable()
export class UserService {

    private readonly saltOrRounds: number = 8;

    constructor(@InjectRepository(UserRepository) private usersRepository: UserRepository) {
    }

    findAll() {
        return this.usersRepository.find();
    }

    async findOneWithToken(token: string) {
        if (!token) throw new NotFoundException();

        const userCheck = await this.usersRepository.findOne({
            token: token
        });
        if (!userCheck) {
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
        if (!userCheck) {
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

    async create(createUserDto: CreateUserDto) {
        try {
            await this.findOneWithUsername(createUserDto.userName); // Can throw NotFoundException

            if (createUserDto.password) {
                createUserDto.password = await this.hash(createUserDto.password);
            }
            const createResponse = await this.usersRepository.save(createUserDto);
            delete createResponse.password;
            delete createResponse.token;

            return createResponse;
        } catch (excepted) {
            throw new BadRequestException("Username already exist");
        }
    }

    async update(updateUserDto: UpdateUserDto) {
        await this.findOne(updateUserDto.id); // Can throw NotFoundException

        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, this.saltOrRounds);
        }

        const updateResponse = await this.usersRepository.save(updateUserDto);
        delete updateResponse.password;
        delete updateResponse.token;
        return updateResponse;
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
}
