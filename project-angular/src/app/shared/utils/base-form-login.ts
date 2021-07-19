import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';

@Injectable({ providedIn: 'root' })
export class BaseFormLogin {
  private isValidEmail = /\S+@\S+\.\S+/;
  errorMessage = '';

  constructor(private fb: FormBuilder) {}

  baseFormLogin = this.fb.group({
    correo: ['',[Validators.required, Validators.pattern(this.isValidEmail)]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  isValidField(field: string): boolean{
    this.getErrorMessage(field);
    return(
      (this.baseFormLogin.get(field)?.touched || this.baseFormLogin.get(field)?.dirty) && 
      !this.baseFormLogin.get(field)?.valid
    )!;
  }


//   isValidField(field: string): boolean {
//     this.getErrorMessage(field);
//     return (
//       (this.baseForm.get(field).touched || this.baseForm.get(field).dirty) &&
//       !this.baseForm.get(field).valid
//     );
//   }

//   private getErrorMessage(field:string): void{
//     const { errors } = this.baseForm.get(field)!;
//         if (errors) {
//           const minlenght = errors?.minlength?.requiredLength;
//           const messages = {
//             required: 'You must enter a value.',
//             pattern: 'Not a valid email.',
//             minlength: `This field must be longer than ${minlenght} characters`,
//           };
    
//         const errorKey = Object.keys(errors).find(Boolean);
//         this.errorMessage = messages[errorKey];
//         }
//   }

  private getErrorMessage(field:string): string{
    let message = "" || '';
    if(this.baseFormLogin.get(field)?.errors?.required){
      message = 'you must enter a value';
    }else if(this.baseFormLogin.get(field)?.hasError('pattern')){
      message = 'Not a valid email';
    }else if(this.baseFormLogin.get(field)?.hasError('minlength')){
      const minLength = this.baseFormLogin.get(field)?.errors?.minlength.requiredLength;
      message = `this field must be longer than ${minLength} characters`;
    }
    return this.errorMessage = message;
  }

// private getErrorMessage(field: string): void {
//     const { errors } = this.baseForm.get(field);

//     if (errors) {
//       const minlenght = errors?.minlength?.requiredLength;
//       const messages = {
//         required: 'You must enter a value.',
//         pattern: 'Not a valid email.',
//         minlength: `This field must be longer than ${minlenght} characters`,
//       };

//       const errorKey = Object.keys(errors).find(Boolean);
//       this.errorMessage = messages[errorKey];
//     }
//   }
// }
}