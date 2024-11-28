import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ClaseEntity } from '../../clase/clase.entity/clase.entity';
import { BonoEntity } from '../../bono/bono.entity/bono.entity';

@Entity()
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cedula: number;

    @Column()
    nombre: string;

    @Column()
    grupoDeInvestigacion: string;

    @Column()
    numeroDeExtension: number;

    @Column()
    rol: string;

    @Column()
    jefe: UsuarioEntity;

    @OneToMany(() => ClaseEntity, clase => clase.usuario)
    clases: ClaseEntity[];

    @OneToMany(() => BonoEntity, bono => bono.usuario)
    bonos: BonoEntity[];


    
}