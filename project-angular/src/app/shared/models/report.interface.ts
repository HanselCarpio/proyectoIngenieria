export interface AnualResumeResponse {
    totalConsultas: number;
    totalProyectos: number;
    totalcAdmin: number;
    totalcPersonal: number;
    total: number;
}

export interface TotalConsultasResponse {
    departamento:string;
    total: number;
}

export interface ResumenConsultasResponse {
    fechaHora:Date;
    departamento:string;
    name:string;
    asuntoDetallado:string;
}

export interface ResumenContratosResponse {
    fechaHora:Date;
    departamento:string;
    name:string;
    asuntoDetallado:string;
}