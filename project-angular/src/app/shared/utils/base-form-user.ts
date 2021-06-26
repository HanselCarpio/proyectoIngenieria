import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';

@Injectable({ providedIn: 'root' })
export class BaseFormUser {
  private isValidEmail = /\S+@\S+\.\S+/;
  errorMessage = '';

  constructor(private fb: FormBuilder) {}

  baseForm = this.fb.group({
    name: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    role: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    cedula: ['', [Validators.required], Validators.minLength(8)],
    birthday: ['', [Validators.required]],
    idDepto: ['', [Validators.required]],
    correo: ['',[Validators.required, Validators.pattern(this.isValidEmail)]],
    cel: ['', [Validators.required], Validators.minLength(6)],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  isValidField(field: string): boolean{
    this.getErrorMessage(field);
    return(
      (this.baseForm.get(field)?.touched || this.baseForm.get(field)?.dirty) && 
      !this.baseForm.get(field)?.valid
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
    if(this.baseForm.get(field)?.errors?.required){
      message = 'you must enter a value';
    }else if(this.baseForm.get(field)?.hasError('pattern')){
      message = 'Not a valid email';
    }else if(this.baseForm.get(field)?.hasError('minlength')){
      const minLength = this.baseForm.get(field)?.errors?.minlength.requiredLength;
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