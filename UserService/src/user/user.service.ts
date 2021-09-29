import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './dto/user.repository';

@Injectable()
export class UserService {

  private readonly saltOrRounds: number = 16;

  constructor(private usersRepository: UserRepository) {

  }

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.password) {
      const hash = await bcrypt.hash(createUserDto.password, this.saltOrRounds);
      createUserDto.password = hash;
    }
    return this.usersRepository.save(createUserDto);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOne(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const hash = await bcrypt.hash(updateUserDto.password, this.saltOrRounds);
      updateUserDto.password = hash;
    }
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
