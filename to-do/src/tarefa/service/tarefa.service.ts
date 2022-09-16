import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Tarefa } from '../entities/tarefa.entity';
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, ILike, Repository } from 'typeorm' 

@Injectable()
export class TarefaService{
    constructor(
        @InjectRepository(Tarefa)
        private tarefaRepository: Repository<Tarefa>
    ){}

    async findAll(): Promise<Tarefa []> {
        return this.tarefaRepository.find({
            relations: {
                categoria: true
            }
        })   //consulta os dados da tabela (http://localhost/tarefa)
    }

    async findById(id: number): Promise<Tarefa>{
        let tarefa = await this.tarefaRepository.findOne({
            where: { 
                id                          
            },
            relations: {
                categoria: true
            }
        })//consulta os dados da tabela pelo id(http://localhost/tarefa/1)

        if(!tarefa){
            throw new HttpException("Tarefa não encontrada", HttpStatus.NOT_FOUND)
        }
        return tarefa
    }

    async findByNome(nome: string): Promise<Tarefa[]>{
        return this.tarefaRepository.find({
            where:{
                nome: ILike(`%${nome}%`)
            },
            relations: {
                categoria: true
            }
        })
    }

    async findByResponsavel(responsavel: string): Promise<Tarefa[]>{
        return this.tarefaRepository.find({
            where:{
                responsavel: ILike(`%${responsavel}%`)
            },
            relations: {
                categoria: true
            }
        })
    }
    
    async create(tarefa: Tarefa): Promise<Tarefa>{
        return this.tarefaRepository.save(tarefa)
    }// promises são obrigatórias retornar algo ou retornará um erro

    async update( tarefa: Tarefa): Promise<Tarefa>{
        let tarefaUpdate = await this.findById(tarefa.id)

        if(!tarefaUpdate || !tarefa.id){
            throw new HttpException("Tarefa não encontrada!", HttpStatus.NOT_FOUND)

        }
        return this.tarefaRepository.save(tarefa)
    }

    async delete(id: number): Promise<DeleteResult>{
        let tarefaDelete = await this.findById(id)

        if(!tarefaDelete){
            throw new HttpException('tarefa não foi encontrada', HttpStatus.NOT_FOUND)
        }
        return this.tarefaRepository.delete(id)
    }
}