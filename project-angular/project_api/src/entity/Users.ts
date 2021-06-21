import { Entity, PrimaryGeneratedColumn, Unique, Column} from 'typeorm';
import { MinLength, IsNotEmpty, IsEmail, MaxLength} from 'class-validator';
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['username'])
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MinLength(6)
  @MaxLength(50)
  @IsEmail()
  @IsNotEmpty()
  username: string;

  @Column()
  @MinLength(6)
  @MaxLength(100)
  @IsNotEmpty()
  password: string;

  @Column()
  @IsNotEmpty()
  @MaxLength(10)
  role: string;

  // @Column() 
  // @IsOptional()
  // @IsNotEmpty()
  // resetToken?: string; 

  hashPassword(): void {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }

  checkPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}
