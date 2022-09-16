import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DeleteResult } from "typeorm";
import { Tarefa } from "../entities/tarefa.entity";
import { TarefaService } from "../service/tarefa.service";

@ApiTags('Tarefa') // separa as requições por entidades
@Controller('/tarefa')
export class TarefaController {
    constructor(private readonly service: TarefaService){}

    //faz a requisição Get trazendo a consulta de todos os itens do banco
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll():Promise<Tarefa []>{
        return this.service.findAll()
    }

    //faz a consulta trazendo apenas o item com o id passado
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Tarefa>{
        return this.service.findById(id)
    }

    @Get('/nome/:nome') //http://localhost/tarefa/nome/fabiano
    @HttpCode(HttpStatus.OK)
    findByNome(@Param('nome') nome: string): Promise<Tarefa[]>{
        return this.service.findByNome(nome)
    }
    @Get('/responsavel/:responsavel')
    @HttpCode(HttpStatus.OK)
    findByResponsavel(@Param('responsavel') responsavel: string): Promise<Tarefa[]>{
        return this.service.findByResponsavel(responsavel)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() tarefa:Tarefa): Promise<Tarefa>{
        return this.service.create(tarefa)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() tarefa: Tarefa): Promise<Tarefa>{
        return this.service.update(tarefa)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    Delete(@Param('id', ParseIntPipe)id: number): Promise<DeleteResult>{
        return this.service.delete(id)
    }
}