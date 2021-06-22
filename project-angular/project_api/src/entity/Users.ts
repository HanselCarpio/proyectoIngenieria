import { Entity, PrimaryGeneratedColumn, Unique, Column} from 'typeorm';
import { MinLength, IsNotEmpty, IsEmail, MaxLength} from 'class-validator';
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['correo'])
export class Users {
  // @PrimaryGeneratedColumn()
  // id: number;

  // @Column()
  // @MinLength(6)
  // @MaxLength(50)
  // @IsEmail()
  // @IsNotEmpty()
  // username: string;

  // @Column()
  // @MinLength(6)
  // @MaxLength(100)
  // @IsNotEmpty()
  // password: string;

  // @Column()
  // @IsNotEmpty()
  // @MaxLength(10)
  // role: string;

  // @Column() 
  // @IsOptional()
  // @IsNotEmpty()
  // resetToken?: string; 


  @PrimaryGeneratedColumn()
  idUser: number;

  @Column({ type: "varchar", length: 50 })
  @MaxLength(50)
  @IsNotEmpty()
  name: string;

  @Column({ type: "varchar", length: 80 })
  @MaxLength(80)
  @IsNotEmpty()
  lastname: string;
  
  @Column({ type: "varchar", length: 10 })
  @IsNotEmpty()
  @MaxLength(10)
  role: string;
  
  @Column({ type: "int"})
  @IsNotEmpty()
  gender: number;// 1=H y 2=M

  @Column({ type: "varchar", length: 30 })
  @MinLength(8)
  @MaxLength(30)
  @IsNotEmpty()
  cedula: string;

  // @Column({ type: "varchar", length: 100 })
  // @MinLength(1)
  // @MaxLength(100)
  // @IsNotEmpty()
  // photo: string;

  @Column({ type: "date"})
  @IsNotEmpty()
  birthday: Date;

  @Column({ type: "int"})
  @IsNotEmpty()
  idDepto: number;

  @Column({ type: "varchar", length: 100 })
  @MaxLength(100)
  @IsEmail()
  @IsNotEmpty()
  correo: string;

  @Column({ type: "varchar", length: 15 })
  @MinLength(6)
  @MaxLength(15)
  @IsNotEmpty()
  cel: string;

  @Column({ type: "varchar", length: 100 })
  @MinLength(8)
  @MaxLength(100)
  @IsNotEmpty()
  password: string;

  

  hashPassword(): void {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }

  checkPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}
