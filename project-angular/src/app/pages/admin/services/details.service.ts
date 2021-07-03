import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Details } from '@app/shared/models/details.interface';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(private http: HttpClient) { }

  getAllDetails(): Observable<Details[]> {
    return this.http
      .get<Details[]>(`${environment.project_api_URL}/details`)
      .pipe(catchError(this.handlerError));
  }

  // getUserById(userId: number): Observable<User> {
  //   return this.http
  //     .get<any>(`${environment.project_api_URL}/users/${userId}`)
  //     .pipe(catchError(this.handlerError));
  // }

  newDetails(details: Details): Observable<Details> {
    return this.http
      .post<Details>(`${environment.project_api_URL}/details/detail`, details)
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
