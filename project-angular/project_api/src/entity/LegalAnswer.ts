import { Entity, PrimaryGeneratedColumn, Unique, Column} from 'typeorm';
import { IsEmail, IsNotEmpty, MaxLength} from 'class-validator';

@Entity()
export class LegalAnswer {

  @PrimaryGeneratedColumn()
  idRespuesta: number;

  @Column({ type: "varchar", length: 50 })
  @MaxLength(50)
  @IsNotEmpty()
  descripcion: string;

  @Column({ type: "varchar", length: 200 })
  @MaxLength(200)
  @IsNotEmpty()
  detalleRespuesta: string;

  @Column({ type: "date"})
  @IsNotEmpty()
  fechaHoraRespuesta: Date;

  @Column({ type: "int"})
  @IsNotEmpty()
  idUserRespuesta: number;

  @Column({ type: "varchar", length: 20 })
  @MaxLength(20)
  @IsNotEmpty()
  ipCompu: string;

  @Column({ type: "int"})
  @IsNotEmpty()
  idBoleta: number;
  
}