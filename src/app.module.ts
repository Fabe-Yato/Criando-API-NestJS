import { AppService } from './app.service';
import { AppController } from 'src/app.controller';
import { CategoriaModule } from './categoria/modules/categoria.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './categoria/entities/categoria.entity';
import { Tarefa } from './tarefa/entities/tarefa.entity';
import { TarefaModule } from './tarefa/modules/tarefa.module';


@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type:'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'Fabitdb2114',
    //   database: 'db_todo',
    //   entities: [Tarefa, Categoria],
    //   synchronize: true
    // }),
    TypeOrmModule.forRoot({
      type:'postgres',
      url: process.env.DATABASE_URL,
      logging: false,
      dropSchema: false,
      ssl:{
        rejectUnauthorized: false //qualquer um pode fazer requisições ao banco
      },
      autoLoadEntities: true,
      synchronize: true
    }),
    TarefaModule,
    CategoriaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
