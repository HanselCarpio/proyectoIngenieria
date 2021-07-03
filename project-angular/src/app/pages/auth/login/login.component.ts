import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseFormUser } from '@shared/utils/base-form-user';
import { AuthService } from '@auth/auth.service';
import { Subscription } from 'rxjs';
import { BaseFormSession } from '@app/shared/utils/base-form-session';
import { SessionService } from '@app/pages/admin/services/session.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  hide = true;
  // private isValidEmail = /\S+@\S+\.\S+/;
  private subscription: Subscription = new Subscription();
  //private subscription: Subscription []= [];
  // loginForm = this.fb.group({
  //   username:['', [Validators.required, Validators.pattern(this.isValidEmail)]],
  //   password:['', [Validators.required, Validators.minLength(5)]],
  // });

  constructor(
    private authSvc: AuthService,
    private seSvc: SessionService,
    private router: Router,
    public loginForm: BaseFormUser,
    public loginFormSession: BaseFormSession,
    // private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm.baseFormUser.get('name')?.setValidators(null);
    this.loginForm.baseFormUser.get('name')?.updateValueAndValidity();
    this.loginForm.baseFormUser.get('lastname')?.setValidators(null);
    this.loginForm.baseFormUser.get('lastname')?.updateValueAndValidity();
    this.loginForm.baseFormUser.get('role')?.setValidators(null);
    this.loginForm.baseFormUser.get('role')?.updateValueAndValidity();
    this.loginForm.baseFormUser.get('gender')?.setValidators(null);
    this.loginForm.baseFormUser.get('gender')?.updateValueAndValidity();
    this.loginForm.baseFormUser.get('cedula')?.setValidators(null);
    this.loginForm.baseFormUser.get('cedula')?.updateValueAndValidity();
    this.loginForm.baseFormUser.get('birthday')?.setValidators(null);
    this.loginForm.baseFormUser.get('birthday')?.updateValueAndValidity();
    this.loginForm.baseFormUser.get('idDepto')?.setValidators(null);
    this.loginForm.baseFormUser.get('idDepto')?.updateValueAndValidity();
    this.loginForm.baseFormUser.get('cel')?.setValidators(null);
    this.loginForm.baseFormUser.get('cel')?.updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    //this.suscription.forEach(sub => sub.unsubscribe);
  }

  onLogin(): void {
    if (this.loginForm.baseFormUser.invalid) {
      return;
    }
    const formValue = this.loginForm.baseFormUser.value;
    this.subscription.add(this.authSvc.login(formValue).subscribe((res) => {
      if (res) {
        // const formValueSession = this.loginFormSession.baseFormSession.value;
        // this.subscription.add(this.seSvc.newSession(formValueSession).subscribe((res) => {
        // if (res) {
        //   this.router.navigate(['']);
        // }
        // })
        // )
        this.router.navigate(['']);
      }
    })
    )
    const formValueSession = this.loginFormSession.baseFormSession.value;
    this.subscription.add(this.seSvc.newSession(formValueSession).subscribe((res) => {
      if (res) {
        this.router.navigate(['']);
      }
    })
    )
  }

    /*const formValue = this.loginForm.baseForm.value;
    this.subscription.add(
      this.authSvc.login(formValue).subscribe((res) => {
        if (res) {
          this.router.navigate(['']);
        }
      })
    );
  }

  checkField(field: string): boolean {
    return this.loginForm.isValidField(field);
  }*/
  
  // getErrorMessage(field:string): string{
  //   let message = "" || '';
  //   if(this.loginForm.get(field)?.errors?.required){
  //     message = 'you must enter a value';
  //   }else if(this.loginForm.get(field)?.hasError('pattern')){
  //     message = 'Not a valid email';
  //   }else if(this.loginForm.get(field)?.hasError('minlength')){
  //     const minLength = this.loginForm.get(field)?.errors?.minlength.requiredLength;
  //     message = `this field must be longer than ${minLength} characters`;
  //   }
  //   return message;
  // }

  checkField(field: string): boolean{
    return this.loginForm.isValidField(field);
    // return(
    //   (this.loginForm.get(field)?.touched || this.loginForm.get(field)?.dirty) && 
    //   !this.loginForm.get(field)?.valid
    // )!;
  }
}

