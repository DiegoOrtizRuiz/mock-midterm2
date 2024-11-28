import { Module } from '@nestjs/common';
import { PropuestaService } from './clase.service';
import { PropuestaEntity } from './clase.entity/clase.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropuestaController } from './propuesta.controller';

@Module({
  providers: [PropuestaService],
  imports: [TypeOrmModule.forFeature([PropuestaEntity])],
  controllers: [PropuestaController]
})
export class PropuestaModule {}
