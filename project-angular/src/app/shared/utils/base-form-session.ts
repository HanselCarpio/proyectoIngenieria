import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';

@Injectable({ providedIn: 'root' })
export class BaseFormSession {
  [x: string]: any;
  private isValidEmail = /\S+@\S+\.\S+/;
  errorMessage = '';
  date: Date = new Date();
  s = JSON.parse(localStorage.getItem('user')!);


  constructor(private fb: FormBuilder) {}  

  baseFormSession = this.fb.group({
    ipCompu: ['190.113.102.144'],
    correoUser: ['admin@gmail.com'],
    fechaHoraConex: [this.date],
  });

  isValidField(field: string): boolean{
    this.getErrorMessage(field);
    return(
      (this.baseFormSession.get(field)?.touched || this.baseFormSession.get(field)?.dirty) && 
      !this.baseFormSession.get(field)?.valid
    )!;
  }

  

  

//  getValueCorreo(field:string): string{  
//     let correoUser: string;  
//     return correoUser = field;
//   }

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
    if(this.baseFormSession.get(field)?.errors?.required){
      message = 'you must enter a value';
    }else if(this.baseFormSession.get(field)?.hasError('pattern')){
      message = 'Not a valid email';
    }else if(this.baseFormSession.get(field)?.hasError('minlength')){
      const minLength = this.baseFormSession.get(field)?.errors?.minlength.requiredLength;
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