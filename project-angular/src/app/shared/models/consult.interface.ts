export type Roles = 'SUSCRIPTOR' | 'ADMIN';

// export interface User {
//   correo: string;
//   password: string;
// }

export interface Consult{
    boletaId: number;
    fechaHora: Date;
    userId: number;
    palabraClaveConsulta1: string;
    palabraClaveConsulta2: string;    
    asuntoDetallado: string;
    ipCompu: string;
    cantidadCambios: number;
    idClasificador: number;
}
