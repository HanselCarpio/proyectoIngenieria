import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import { IsNotEmpty, MaxLength} from 'class-validator';

@Entity()
export class Department {

  @PrimaryGeneratedColumn()
  idDepartment: number;

  @Column({ type: "varchar", length: 100 })
  @MaxLength(100)
  @IsNotEmpty()
  descripcion: string;
}