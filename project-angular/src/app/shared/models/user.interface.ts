export type Roles = 'SUSCRIPTOR' | 'ADMIN';

export interface User {
  correo: string;
  password: string;
}

export interface UserResponse extends User {
  message: string;
  token: string;
  userId: number;
  name: string;
  lastname: string;
  role: Roles;
  gender: number;
  cedula: string;
  birthday: Date;
  idDepto: number;
  cel: string;
}
