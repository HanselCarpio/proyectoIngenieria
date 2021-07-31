import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import { IsNotEmpty, MaxLength} from 'class-validator';

@Entity()
export class Gender {

  @PrimaryGeneratedColumn()
  idGender: number;

  @Column({ type: "varchar", length: 20 })
  @MaxLength(20)
  @IsNotEmpty()
  descripcion: string;
}