import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '@env/environment';
import { SessionResponse } from '@app/shared/models/session.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }

  getAllSession(): Observable<SessionResponse[]> {
    return this.http
      .get<SessionResponse[]>(`${environment.project_api_URL}/session`)
      .pipe(catchError(this.handlerError));
  }

  newSession(session: SessionResponse): Observable<SessionResponse> {
    console.log('res->', session);
    return this.http
      .post<SessionResponse>(`${environment.project_api_URL}/session/`, session)
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
