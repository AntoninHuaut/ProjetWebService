import {Module} from '@nestjs/common';
import {AccessService} from './access.service';
import {AccessController} from './access.controller';
import {UserService} from "../user/user.service";
import {UserRepository} from "../user/dto/user.repository";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [AccessController],
  providers: [UserService, AccessService]
})
export class AccessModule {}