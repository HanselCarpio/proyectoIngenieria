import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, throwError, BehaviorSubject } from 'rxjs';

import { UserResponse, User, Roles } from '@shared/models/user.interface';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
private loggedIn = new BehaviorSubject<boolean>(false);

  /*private user = new BehaviorSubject<UserResponse>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }*/
  constructor(private http: HttpClient){
    this.checkToken();
  }
  /*get user$(): Observable<UserResponse> {
    return this.user.asObservable();
  }

  get userValue(): UserResponse {
    return this.user.getValue();
  }*/

  get islogged(): Observable<boolean>{
    return this.loggedIn.asObservable();
  }
  login(authData:User):Observable<UserResponse | void>{
    return this.http.post<UserResponse>(`${environment.project_api_URL}/auth/login`, authData)
    .pipe(
      map((res: UserResponse) => {
        this.saveToken(res.token);
        this.loggedIn.next(true);
        return res;
      }),
      catchError((err) => this.handlerError(err)))
    }
  /*login(authData: User): Observable<UserResponse | void> {
    return this.http
      .post<UserResponse>(`${environment.API_URL}/auth/login`, authData)
      .pipe(
        map((user: UserResponse) => {
          this.saveLocalStorage(user);
          this.user.next(user);
          return user;
        }),
        catchError((err) => this.handlerError(err))
      );
  }*/

  logout(): void {
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    /*this.user.next(null);
    this.router.navigate(['/login']);*/
  }

  
  private saveToken(token:string):void{
    localStorage.setItem('token', token);
  }


  private checkToken():void{
    //const userToken = JSON.parse(localStorage.getItem('user')!);
    const userToken = localStorage.getItem('token')!;//error, como arreglo eso?
    const isExpired = helper.isTokenExpired(userToken);
    console.log('isExpired ->', isExpired);
    //set userisLogged = isExpired
    if (isExpired) {
        this.logout();
      } else {
        this.loggedIn.next(true);
      }
    }
  

  /*private checkToken(): void {
    const user = JSON.parse(localStorage.getItem('user')) || null;

    if (user) {
      const isExpired = helper.isTokenExpired(user.token);

      if (isExpired) {
        this.logout();
      } else {
        this.user.next(user);
      }
    }
  }

  private saveLocalStorage(user: UserResponse): void {
    const { userId, message, ...rest } = user;
    localStorage.setItem('user', JSON.stringify(rest));
  }*/

  private handlerError(err: { message: any; }): Observable<never> {
    let errorMessage = 'An errror occured retrienving data';
    if (err) {
      errorMessage = `Error: code ${err.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}