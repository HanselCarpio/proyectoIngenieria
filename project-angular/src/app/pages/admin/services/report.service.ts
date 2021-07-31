import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '@env/environment';
import { AnualResumeResponse, ResumenConsultasResponse, ResumenContratosResponse, TotalConsultasResponse } from '@app/shared/models/report.interface';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  getAnualResume(): Observable<AnualResumeResponse[]> {
    return this.http
      .get<AnualResumeResponse[]>(`${environment.project_api_URL}/auth/anualResume`)
      .pipe(catchError(this.handlerError));
  }

  getTotalConsultas(): Observable<TotalConsultasResponse[]> {
    return this.http
      .get<TotalConsultasResponse[]>(`${environment.project_api_URL}/auth/totalConsultas`)
      .pipe(catchError(this.handlerError));
  }

  getResumenConsultas(): Observable<ResumenConsultasResponse[]> {
    return this.http
      .get<ResumenConsultasResponse[]>(`${environment.project_api_URL}/auth/resumenConsultas`)
      .pipe(catchError(this.handlerError));
  }

  getResumenContratos(): Observable<ResumenContratosResponse []> {
    return this.http
      .get<ResumenContratosResponse []>(`${environment.project_api_URL}/auth/resumenContratos`)
      .pipe(catchError(this.handlerError));
  }

  handlerError(error: { message: any; }): Observable<never> {
    let errorMessage = 'Error desconocido';
    if (error) {
      errorMessage = `Error ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
