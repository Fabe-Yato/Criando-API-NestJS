import { Categoria } from './../../categoria/entities/categoria.entity';
import { IsNotEmpty, MaxLength } from 'class-validator'
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger';

@Entity({name: 'tb_tarefa'}) // definindo o nome para o banco
export class Tarefa { //criando a tabela

    @PrimaryGeneratedColumn() // chave primaria
    @ApiProperty()
    id: number


    @IsNotEmpty() //validar se não está vazio
    @MaxLength(50) // validar se o máximo de letras é 50
    @Column({nullable: false, length: 50}) // atributos (not null, tamanho da string)
    @ApiProperty()
    nome: String

    @IsNotEmpty() 
    @MaxLength(500) 
    @Column({nullable: false, length: 500})
    @ApiProperty()
    descricao: String

    @IsNotEmpty() 
    @MaxLength(50)
    @Column({nullable: false, length: 50})
    @ApiProperty()
    responsavel: String

    @Column() //não é necessário passar nenhum valor 
    @ApiProperty()
    data: Date

    @Column() //não é necessário passar nenhum valor
    @ApiProperty()
    status: Boolean

    @ManyToOne(() => Categoria, (categoria) => categoria.tarefas, {
        onDelete: "CASCADE" //excluir tarefas que contém as categorias que foram excluidas automaticamente
    })
    @ApiProperty({type: () => Categoria}) //evitar loop infinito na relação com a Categoria
    categoria: Categoria
}