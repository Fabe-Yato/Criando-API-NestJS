import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  process.env.TZ = '-03:00' //mudando o horário da aplicação

  app.useGlobalPipes(new ValidationPipe()) //Habilitando o validator
  app.enableCors()//Habilitando outros dominios para utilizar a API
  await app.listen(3000);
}
bootstrap();
