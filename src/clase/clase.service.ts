import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClaseEntity } from './clase.entity/clase.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class ClaseService {
    constructor(
        @InjectRepository(ClaseEntity)
        private readonly claseRepository: Repository<ClaseEntity>
    ){}
    
    async crearClase(clase: ClaseEntity): Promise<ClaseEntity> {
        if (clase.codigo.length != 10)
            throw new BusinessLogicException("The class code must be 10 char lenght", BusinessError.NOT_FOUND);
        return await this.claseRepository.save(clase);
    }
    
    async findClaseById(id: number): Promise<ClaseEntity> {
        return await this.claseRepository.findOne({ where: { id } });
    }
}
