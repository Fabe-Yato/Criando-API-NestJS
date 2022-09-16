import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('To-do List')
  .setDescription('To-do list de tarefas')
  .setContact(
    'Fabiano', 
    'https://github.com/Fabe-Yato', 
    'Fabibinho2@gmail.com'
    )
    .setVersion('1.0')
    .build()

  //http://localhost:3000/swagger
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/swagger', app, document)

  process.env.TZ = '-03:00' //mudando o horário da aplicação

  app.useGlobalPipes(new ValidationPipe()) //Habilitando o validator
  app.enableCors()//Habilitando outros dominios para utilizar a API
  await app.listen(process.env.PORT || 3000) // O projeto poderá rodar em qualquer porta fora da 3000
}
bootstrap();
