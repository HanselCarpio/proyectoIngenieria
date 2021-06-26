import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Consult } from '@app/shared/models/consult.interface';

@Injectable({
  providedIn: 'root',
})
export class ConsultsService {
  constructor(private http: HttpClient) {}

  getAllConsults(): Observable<Consult[]> {
    return this.http
      .get<Consult[]>(`${environment.project_api_URL}/consults`)
      .pipe(catchError(this.handlerError));
  }

  // getUserById(userId: number): Observable<User> {
  //   return this.http
  //     .get<any>(`${environment.project_api_URL}/users/${userId}`)
  //     .pipe(catchError(this.handlerError));
  // }

  newConsult(consult: Consult): Observable<Consult> {
    return this.http
      .post<Consult>(`${environment.project_api_URL}/consults/consult`, consult)
      .pipe(catchError(this.handlerError));
  }

  // updateUser(userId: number, user: User): Observable<User> {
  //   return this.http
  //     .patch<User>(`${environment.project_api_URL}/users/${userId}`, user)
  //     .pipe(catchError(this.handlerError));
  // }

  // deleteUser(userId: number): Observable<{}> {
  //   return this.http
  //     .delete<User>(`${environment.project_api_URL}/users/${userId}`)
  //     .pipe(catchError(this.handlerError));
  // }

  handlerError(error: { message: any; }): Observable<never> {
    let errorMessage = 'Error desconocido';
    if (error) {
      errorMessage = `Error ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
