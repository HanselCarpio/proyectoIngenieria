import { Entity, PrimaryGeneratedColumn, Unique, Column} from 'typeorm';
import { IsEmail, IsNotEmpty, MaxLength} from 'class-validator';

@Entity()
export class Details {

  @PrimaryGeneratedColumn()
  idBoleta: number;

  @Column({ type: "varchar", length: 50 })
  @MaxLength(50)
  @IsNotEmpty()
  linea: string;
  
  @Column({ type: "varchar", length: 200 })
  @MaxLength(200)
  @IsNotEmpty()
  evidenciaArchivo: string;

  @Column({ type: "varchar", length: 200 })
  @IsNotEmpty()
  detalle: string;

}