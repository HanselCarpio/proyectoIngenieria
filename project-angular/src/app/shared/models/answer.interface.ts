export type Roles = 'SUSCRIPTOR' | 'ADMIN';

// export interface User {
//   correo: string;
//   password: string;
// }

export interface Answer{
    idRespuesta: number;
    descripcion: string;
    detalleRespuesta: string;
    fechaHoraRespuesta: Date;
    userIdRespuesta: number;
    ipCompu: string;
    idBoleta: number;
}
