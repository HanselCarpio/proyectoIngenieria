import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { User, UserResponse } from './../models/user.interface';
import { AuthService } from '@auth/auth.service';
import { take, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {
  constructor(private authSvc: AuthService) {}
  canActivate(): Observable<boolean> {
      return this.authSvc.user$.pipe(
      // return this.authSvc.islogged.pipe(
      // take(1),
      map((user: UserResponse) => (!user ? true : false))
      // map((isLogged: boolean) => (!isLogged))
    );
  }
  
}
