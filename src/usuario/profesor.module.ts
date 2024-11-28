import { Module } from '@nestjs/common';
import { ProfesorService } from './usuario.service';
import { ProfesorEntity } from './usuario.entity/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesorController } from './profesor.controller';

@Module({
  providers: [ProfesorService],
  imports: [TypeOrmModule.forFeature([ProfesorEntity])],
  controllers: [ProfesorController]
})
export class ProfesorModule {}
