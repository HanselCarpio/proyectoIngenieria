import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
//import { BaseFormUser } from '@shared/utils/base-form-user';
import { AuthService } from '@auth/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  hide = true;
  private isValidEmail = /\S+@\S+\.\S+/;
  private subscription: Subscription = new Subscription();
  //private subscription: Subscription []= [];
  loginForm = this.fb.group({
    username:['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    password:['', [Validators.required, Validators.minLength(5)]],
  });

  constructor(
    private authSvc: AuthService,
    private router: Router,
    //public loginForm: BaseFormUser,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}
    /*this.loginForm.baseForm.get('role').setValidators(null);
    this.loginForm.baseForm.get('role').updateValueAndValidity();
  }*/

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    //this.suscription.forEach(sub => sub.unsubscribe);
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const formValue = this.loginForm.value;
    this.subscription.add(this.authSvc.login(formValue).subscribe((res) => {
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
  
  getErrorMessage(field:string): string{
    let message = "" || '';
    if(this.loginForm.get(field)?.errors?.required){
      message = 'you must enter a value';
    }else if(this.loginForm.get(field)?.hasError('pattern')){
      message = 'Not a valid email';
    }else if(this.loginForm.get(field)?.hasError('minlength')){
      const minLength = this.loginForm.get(field)?.errors?.minlength.requiredLength;
      message = `this field must be longer than ${minLength} characters`;
    }
    return message;
  }

  isValidField(field: string): boolean{
    return(
      (this.loginForm.get(field)?.touched || this.loginForm.get(field)?.dirty) && 
      !this.loginForm.get(field)?.valid
    )!;
  }
}

