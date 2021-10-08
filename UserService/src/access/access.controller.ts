import {Body, Controller, Delete, Get, Param, Post, Query, Req} from '@nestjs/common';
import {AccessService} from './access.service';
import {Action} from "./entities/action.enum";
import {LoginUserDto} from "./dto/login-user-dto";

@Controller('access')
export class AccessController {

    constructor(private readonly accessService: AccessService) {
    }

    @Get('/:action/:token')
    async canDo(@Param('action') action: Action, @Param('token') token: string) {
        const bolRes = await this.accessService.canDo(action, token);
        return {
            access: bolRes
        }
    }

    @Delete('/:logout/:token')
    async deleteToken(@Param('token') token: string) {
        await this.accessService.deleteToken(token);
    }

    @Post('/login')
    async login(@Body() loginUserDto: LoginUserDto) {
        return this.accessService.login(loginUserDto);
    }
}
