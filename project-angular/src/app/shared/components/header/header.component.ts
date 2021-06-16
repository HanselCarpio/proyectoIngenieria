//import { UserResponse } from './../../models/user.interface';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '@auth/auth.service';
//import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
//import { takeUntil } from 'rxjs/operators';
//import { Roles } from '@app/shared/models/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAdmin = null;
  isLogged = false;
  //isAdmin = false;
  //private subscription: Subscription = new Subscription;

  private destroy$ = new Subject<any>();
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private authSvc: AuthService) {}

  ngOnInit(): void {
    this.authSvc.islogged.pipe(
      takeUntil(this.destroy$)
    ).subscribe((res) => (this.isLogged = res));

    this.authSvc.isAdmin.pipe(
      takeUntil(this.destroy$)
    ).subscribe((res:any) => (this.isAdmin = res));
    /*this.authSvc.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: UserResponse) => {
        this.isLogged = true;
        this.isAdmin = user?.role;
      });*/
  }
  
  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }

  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
    this.destroy$.next({});
    this.destroy$.complete();
  }

  onLogout(): void {
    this.authSvc.logout();
  }
}
