import { IsNotEmpty, MaxLength } from 'class-validator'
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({name: 'tb_tarefa'}) // definindo o nome para o banco
export class Tarefa { //criando a tabela

    @PrimaryGeneratedColumn() // chave primaria
    id: number


    @IsNotEmpty() //validar se não está vazio
    @MaxLength(50) // validar se o máximo de letras é 50
    @Column({nullable: false, length: 50}) // atributos (not null, tamanho da string)
    nome: String

    @IsNotEmpty() 
    @MaxLength(500) 
    @Column({nullable: false, length: 500})
    descricao: String

    @IsNotEmpty() 
    @MaxLength(50)
    @Column({nullable: false, length: 50})
    responsavel: String

    @Column() //não é necessário passar nenhum valor 
    data: Date

    @Column() //não é necessário passar nenhum valor 
    status: Boolean
}