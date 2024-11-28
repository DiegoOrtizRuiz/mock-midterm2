import { Controller, UseInterceptors, Post, Body, Get, Delete} from '@nestjs/common';
import { BonoService } from './bono.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { BonoEntity } from './bono.entity/bono.entity';
import { BonoDto } from './bono.dto/bono.dto';
import { UsuarioDto } from 'src/usuario/usuario.dto/usuario.dto';
import { plainToInstance } from 'class-transformer';
import { UsuarioEntity } from 'src/usuario/usuario.entity/usuario.entity';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('bonos')
export class BonoController {
    constructor(private readonly bonoService: BonoService) {}

    @Post()
    async crearBono(@Body() bonoDto: BonoDto, usuarioDto: UsuarioDto): Promise<BonoEntity> {
        const bono: BonoEntity = plainToInstance(BonoEntity, bonoDto);
        const usuario: UsuarioEntity = plainToInstance(UsuarioEntity, usuarioDto);
        return await this.bonoService.crearBono(bono, usuario);
    }

    @Get(':codigo')
    async findBonoByCodigo(@Body() codigo: string): Promise<BonoEntity> {
        return await this.bonoService.findBonoByCodigo(codigo);
    }

    @Get(':usuarioId')
    async findAllBonosByUsuario(@Body() usuarioId: number): Promise<BonoEntity[]> {
        return await this.bonoService.findAllBonosByUsuario(usuarioId);
    }

    @Delete(':id')
    async deleteBono(@Body() id: number): Promise<void> {
        return await this.bonoService.deleteBono(id);
    }
}
