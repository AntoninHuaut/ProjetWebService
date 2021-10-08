import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put, Query,
    UseInterceptors
} from '@nestjs/common';
import {UserService} from './user.service';
import {FormCreateUser} from "./dto/FormCreateUser";
import {FormUpdateUser} from "./dto/FormUpdateUser";

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {

    constructor(private readonly userService: UserService) {
    }

    @Get()
    async findAll(@Query('name') name: string) {
        return this.userService.findAll(name);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @Post()
    async create(@Body() createUserDto: FormCreateUser) {
        return this.userService.create(createUserDto);
    }

    @Put()
    async update(@Body() updateUserDto: FormUpdateUser) {
        return this.userService.update(updateUserDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}
