import { Categoria } from './../entities/categoria.entity';
import { HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";



export class CategoriaService{
    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>
    ){}

    async findAll(): Promise<Categoria []> {
        return this.categoriaRepository.find({
            relations: {
                tarefas: true
            } //puxa os dados da tarefa ao fazer a consulta
    })   //consulta os dados da tabela (http://localhost/tarefa)
    }

    async findById(id: number): Promise<Categoria>{
        let categoria = await this.categoriaRepository.findOne({
            where: { 
                id                          
            },
            relations: {
                tarefas: true
            }
        })//consulta os dados da tabela pelo id(http://localhost/tarefa/1)

        if(!categoria){
            throw new HttpException("Categoria não encontrada", HttpStatus.NOT_FOUND)
        }
        return categoria
    }

    async findByNome(descricao: string): Promise<Categoria[]>{
        return this.categoriaRepository.find({
            where:{
                descricao: ILike(`%${descricao}%`)
            },
            relations: {
                tarefas: true
            }
        })
    }
    
    async create(categoria: Categoria): Promise<Categoria>{
        return this.categoriaRepository.save(categoria)
    }// promises são obrigatórias retornar algo ou retornará um erro

    async update( categoria: Categoria): Promise<Categoria>{
        let categoriaUpdate = await this.findById(categoria.id)

        if(!categoriaUpdate || !categoria.id){
            throw new HttpException("Tarefa não encontrada!", HttpStatus.NOT_FOUND)

        }
        return this.categoriaRepository.save(categoria)
    }

    async delete(id: number): Promise<DeleteResult>{
        let categoriaDelete = await this.findById(id)

        if(!categoriaDelete){
            throw new HttpException('categoria não foi encontrada', HttpStatus.NOT_FOUND)
        }
        return this.categoriaRepository.delete(id)
    }

}