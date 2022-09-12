import { CategoriaService } from './../services/categoria.services';
import { AppController } from "src/app.controller";
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Categoria } from '../entities/categoria.entity';
import { DeleteResult } from 'typeorm';

@Controller('/categoria')
export class categoriaController{
    constructor(private readonly service: CategoriaService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll():Promise<Categoria []>{
        return this.service.findAll()
    }

    //faz a consulta trazendo apenas o item com o id passado
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Categoria>{
        return this.service.findById(id)
    }

    @Get('/descricao/:descricao') //http://localhost/tarefa/nome/fabiano
    @HttpCode(HttpStatus.OK)
    findByNome(@Param('descricao') descricao: string): Promise<Categoria[]>{
        return this.service.findByNome(descricao)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() categoria:Categoria): Promise<Categoria>{
        return this.service.create(categoria)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() categoria: Categoria): Promise<Categoria>{
        return this.service.update(categoria)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    Delete(@Param('id', ParseIntPipe)id: number): Promise<DeleteResult>{
        return this.service.delete(id)
    }
}