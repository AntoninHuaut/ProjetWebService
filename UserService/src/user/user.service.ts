import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './dto/user.repository';

@Injectable()
export class UserService {

  private readonly saltOrRounds: number = 8;

  constructor(private usersRepository: UserRepository) {
  }

  findAll() {
    return this.usersRepository.find();
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
    if (createUserDto.password) {
      const hash = await bcrypt.hash(createUserDto.password, this.saltOrRounds);
      createUserDto.password = hash;
    }
    const createResponse = await this.usersRepository.save(createUserDto);
    delete createResponse.password;
    return createResponse;
  }

  async update(updateUserDto: UpdateUserDto) {
    await this.findOne(updateUserDto.id); // Can throw NotFoundException

    if (updateUserDto.password) {
      const hash = await bcrypt.hash(updateUserDto.password, this.saltOrRounds);
      updateUserDto.password = hash;
    }

    const updateResponse = await this.usersRepository.save(updateUserDto);
    delete updateResponse.password;
    return updateResponse;

  }

  async remove(id: number) {
    const userCheck = await this.findOne(id); // Can throw NotFoundException
    await this.usersRepository.delete(id);
    return userCheck;
  }
}
