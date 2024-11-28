import { Module } from '@nestjs/common';
import { ProyectoService } from './bono.service';
import { ProyectoEntity } from './bono.entity/bono.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectoController } from './bono.controller';

@Module({
  providers: [ProyectoService],
  imports: [TypeOrmModule.forFeature([ProyectoEntity])],
  controllers: [ProyectoController]
})
export class ProyectoModule {}
