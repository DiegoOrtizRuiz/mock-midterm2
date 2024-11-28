import {IsNotEmpty, IsString, IsNumber} from 'class-validator';
export class UsuarioDto {

 @IsNumber()
 @IsNotEmpty()
 readonly cedula: number;

 @IsString()
 @IsNotEmpty()
 readonly nombre: string;

 @IsString()
 @IsNotEmpty()
 readonly grupoDeInvestigacion: string;

 @IsNumber()
 @IsNotEmpty()
 readonly numeroDeExtension: number;

@IsString()
@IsNotEmpty()
readonly rol: string;


 
}