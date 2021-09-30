import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {AccessModule} from './access/access.module';

@Module({
    imports: [UserModule, AccessModule, ConfigModule.forRoot(), TypeOrmModule.forRoot({
        type: 'sqlite',
        database: 'db',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true
    })],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
