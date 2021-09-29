import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor } from "@nestjs/common";
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT);

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector))
  );
}
bootstrap();
