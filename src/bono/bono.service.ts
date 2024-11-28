import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BonoEntity } from './bono.entity/bono.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity/usuario.entity';
import { ClaseEntity } from 'src/clase/clase.entity/clase.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class BonoService {
    constructor(
        @InjectRepository(BonoEntity)
        private readonly bonoRepository: Repository<BonoEntity>,
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
        @InjectRepository(ClaseEntity)
        private readonly claseRepository: Repository<ClaseEntity>  
    ){}
    async crearBono(bono: BonoEntity, usuario: UsuarioEntity): Promise<BonoEntity> {
        if (!bono.monto || bono.monto <= 0) {
            throw new BusinessLogicException('El monto debe ser un valor positivo', BusinessError.BAD_REQUEST);
        }

        if (usuario.rol !== 'profesor') {
            throw new BusinessLogicException('El usuario no tiene el rol de profesor', BusinessError.FORBIDDEN);
        }

        return await this.bonoRepository.save(bono);
    }

    async findBonoByCodigo(codigo: string): Promise<BonoEntity> {
        const clase: ClaseEntity = await this.claseRepository.findOne({ where: { codigo } });
        if (!clase) {
            throw new BusinessLogicException('Clase no encontrada', BusinessError.NOT_FOUND);
        }

        return await this.bonoRepository.findOne({ where: { clase } });

    }

    async findAllBonosByUsuario(usuarioId: number): Promise<BonoEntity[]> {

    const usuario: UsuarioEntity = await this.usuarioRepository.findOne({ where: { id: usuarioId } });

    if (!usuario) {
        throw new BusinessLogicException('Usuario no encontrado', BusinessError.NOT_FOUND);
    }
    
    return await this.bonoRepository.find({ where: { usuario } });
    }

    async deleteBono(id: number): Promise<void> {
        const bono: BonoEntity = await this.bonoRepository.findOne({ where: { id } });

        if (!bono) {
            throw new BusinessLogicException('Bono no encontrado', BusinessError.NOT_FOUND);
        }

        if (bono.calificacion > 4) {
            throw new BusinessLogicException('No se puede eliminar un bono con calificación mayor a 4', BusinessError.FORBIDDEN);
        }

        await this.bonoRepository.remove(bono);
    }

    
}
