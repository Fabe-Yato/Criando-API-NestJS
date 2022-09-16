import { TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Delete } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { response } from 'express';

describe('Testes do Módulo de Tarefa(e2e)', () => {
  let app: INestApplication;

  let tarefaId;
  let tarefaResponsavel;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type:'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'Fabitdb2114',
          database: 'db_todolist_teste',
          autoLoadEntities: true, //pegar as entidades automaticamente
          synchronize: true,
          logging: false, //não gera nenhum log
          dropSchema: true // sempre destrói e recria o schema quando executado

          //use beforeAll para não destruir os schemas antes de testa-los
        }),
        AppModule
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  /*
    it - indica um teste de requisição para ser feito

    ('/(GET)' - indica a requisição que será feita

    request(app.getHttpServer()) - indica a porta em que o servidorestá rodando

    .expect(200) - espera um retorno 200 para a requisição
  */

  // it('/ (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/')
  //     .expect(200)
  //     .expect('Hello World!');
  // });


  //teste para inserir uma tarefa no banco

  it('Deve inserir uma tarefa no banco',  async () => {
    let response = await request(app.getHttpServer())
      .post('/tarefa')
      .send({
        nome: 'Primeira Tarefa',
        descricao: 'Primeira tarefa do dia',
        responsavel: 'Fabiano',
        data: '2022-09-15',
        status: true
      })
      .expect(201) //201 - sucesso ao criar algo no banco

      tarefaId = response.body.id
      tarefaResponsavel = response.body.responsavel
  })

  //teste para recuperar uma tarefa especifica
  it('Deve recuperar uma tarefa especifica', async () =>{
    return request(app.getHttpServer())
      .get(`/tarefa/${tarefaId}`) //caminho para acesso da requisição
      .expect(200) //200 - sucesso ao trazer tarefa
  })

  //recuperar pelo resposavel da tarefa
  it('Deve recuperar pelo responsavel da tabela', async () => {
    return request(app.getHttpServer())
    .get(`/tarefa/responsavel/${tarefaResponsavel}`)
    .send({
      nome: 'Primeira Tarefa',
      descricao: 'Primeira tarefa do dia',
      responsavel: 'Fabiano',
      data: '2022-09-15',
      status: true
    })
    .expect(200)
  })

  //teste atualizar tarefa
  it('Deve atualizar uma tarefa', async() => {
    return request(app.getHttpServer())
      .put('/tarefa')
      .send({
        id: 1,
        nome: 'Primeira Tarefa - atualizada',
        descricao: 'Primeira tarefa do dia',
        responsavel: 'Fabiano',
        data: '2022-09-15',
        status: true
      })
      .expect(200)
      .then(response => {
        expect('Primeira Tarefa - atualizada').toEqual(response.body.nome)
      })
  })

  //teste validar id que não existe
it('Deve retornar um not Found e não atualizar', async () => {
    return request(app.getHttpServer())
    .put('/tarefa')
    .send({
      id: 5,
      nome: 'Primeira Tarefa - atualizada',
      descricao: 'Primeira tarefa do dia',
      responsavel: 'Fabiano',
      data: '2022-09-15',
      status: true
    })
    .expect(404)
  })

  //testar um bad request
  it('deve retornar um bad request', async () => {
    return request(app.getHttpServer())
    .get(`/tarefa/id`)
    .expect(400)
  })


  //verificar se consegue deletar uma tarefa
  it('Deve deletar uma tarefa do banco', async () => {
    return request(app.getHttpServer())
    .delete(`/tarefa/${tarefaId}`)
    .expect(204)
  })

  //deletar uma tarefa que não existe
  it('Deve retornar um Not Found', async () => {
    return request(app.getHttpServer())
    .delete(`/tarefa/${tarefaId}`)
    .send({
      id: 25,
      nome: 'Primeira Tarefa - atualizada',
      descricao: 'Primeira tarefa do dia',
      responsavel: 'Fabiano',
      data: '2022-09-15',
      status: true
    })
    .expect(404)
  })
  
  //parar execução dos testes
  afterAll(async () => {
    await app.close()
  })

}); //rodar teste - npm run teste: e2e (Identificador do Jest)
