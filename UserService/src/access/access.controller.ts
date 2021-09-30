import {Body, Controller, Get, Param, Post} from '@nestjs/common';
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

    @Post('/login')
    async login(@Body() loginUserDto: LoginUserDto) {
        return this.accessService.login(loginUserDto);
    }
}
