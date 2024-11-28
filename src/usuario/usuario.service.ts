import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuario.entity/usuario.entity';
import { BonoEntity } from '../bono/bono.entity/bono.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
        @InjectRepository(BonoEntity)
        private readonly bonoRepository: Repository<BonoEntity>
    ){}
    async findUsuarioById(id: number): Promise<UsuarioEntity> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id}, relations: ["usuarios"] } );
        if (!usuario)
          throw new BusinessLogicException("The user with the given id was not found", BusinessError.NOT_FOUND);
   
        return usuario;
    }
    async crearUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity> {
        if(usuario.grupoDeInvestigacion != "TICSW" && usuario.grupoDeInvestigacion != "IMAGINE" && usuario.grupoDeInvestigacion != "COMIT")
            throw new BusinessLogicException("The user must belong to TICSW, IMAGINE or COMIT", BusinessError.PRECONDITION_FAILED);
        return await this.usuarioRepository.save(usuario);
    }
    
    async eliminarUsuario(id: number): Promise<void> {
        const usuario: UsuarioEntity = await this.findUsuarioById(id);
        
        if (usuario.rol === 'Decana') {
            throw new BusinessLogicException("A user with the role of Decana cannot be deleted", BusinessError.PRECONDITION_FAILED);
        }

        const bonoAsociado = await this.bonoRepository.findOne({ where: { usuario: { id } } });
        if (bonoAsociado) {
            throw new BusinessLogicException("A user with an associated bono cannot be deleted", BusinessError.PRECONDITION_FAILED);
        }

        await this.usuarioRepository.remove(usuario);
    }
}
