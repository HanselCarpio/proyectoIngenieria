import { Entity, PrimaryGeneratedColumn, Unique, Column} from 'typeorm';
import { IsEmail, IsNotEmpty, MaxLength} from 'class-validator';

@Entity()
export class Session {

  @PrimaryGeneratedColumn()
  idSession: number;

  @Column({ type: "varchar", length: 20 })
  @MaxLength(20)
  @IsNotEmpty()
  ipCompu: string;
  
  @Column({ type: "varchar", length: 100 })
  @MaxLength(100)
  @IsEmail()
  @IsNotEmpty()
  correoUser: string;

  @Column({ type: "date"})
  @IsNotEmpty()
  fechaHoraConex: Date;

}