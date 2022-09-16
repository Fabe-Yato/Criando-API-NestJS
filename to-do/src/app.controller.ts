import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor() {}

  @ApiExcludeEndpoint() //Exclui o end-point Swagger 
  @Get()
  async redirect(@Res () resposta: any){
    return resposta.redirect('/swagger')
  }
  
}//redireciona para o site da Api
