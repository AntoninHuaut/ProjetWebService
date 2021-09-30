import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors
} from '@nestjs/common';
import {UserService} from './user.service';
import {User} from "./entities/user.entity";

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Post()
  async create(@Body() createUserDto: User) {
    return this.userService.create(createUserDto);
  }

  @Put()
  async update(@Body() updateUserDto: User) {
    return this.userService.update(updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
