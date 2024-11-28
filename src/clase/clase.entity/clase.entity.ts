import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import { UsuarioEntity } from '../../usuario/usuario.entity/usuario.entity';
import { BonoEntity } from '../../bono/bono.entity/bono.entity';


@Entity()
export class ClaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    codigo: string;

    @Column()
    numeroCreditos: number;

    @ManyToOne(() => UsuarioEntity, usuario => usuario.clases)
    usuario: UsuarioEntity;

    @OneToMany(() => BonoEntity, bono => bono.clase)
    bonos: BonoEntity[];
}