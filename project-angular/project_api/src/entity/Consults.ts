import { Entity, PrimaryGeneratedColumn, Unique, Column} from 'typeorm';
import { IsNotEmpty,  MaxLength} from 'class-validator';

@Entity()
// @Unique(['correo'])
export class Consults {

    // idBoleta
    // fechaHora
    // idUser
    // palabraClaveConsulta1
    // palabraClaveConsulta2
    // asuntoDetallado
    // ipCompu
    // cantidadCambios
    // idClasificador

  @PrimaryGeneratedColumn()
  idBoleta: number;

  @Column({ type: "smalldatetime"})
  @IsNotEmpty()
  fechaHora: Date;

  @Column({ type: "int"})
  @IsNotEmpty()
  idUser: number;

  @Column({ type: "varchar", length: 30 })
  @MaxLength(30)
  @IsNotEmpty()
  palabraClaveConsulta1: string;

  @Column({ type: "varchar", length: 30 })
  @MaxLength(30)
  @IsNotEmpty()
  palabraClaveConsulta2: string;

  @Column({ type: "varchar", length: 255 })
  @MaxLength(255)
  @IsNotEmpty()
  asuntoDetallado: string;
  
  @Column({ type: "varchar", length: 20 })
  @IsNotEmpty()
  @MaxLength(20)
  ipCompu: string;
  
  @Column({ type: "int"})
  @IsNotEmpty()
  cantidadCambios: number;

  @Column({ type: "int"})
  @IsNotEmpty()
  idClasificador: number;  
}
