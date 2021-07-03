import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class BaseFormDetails {
  // private isValidEmail = /\S+@\S+\.\S+/;
  errorMessage = '';

  constructor(private fb: FormBuilder, private http:HttpClient) {}

  baseFormDetails = this.fb.group({
    linea: ['', [Validators.required]],
    evidenciaArchivo: ['', [Validators.required]],
    detalle: ['', [Validators.required]],
  });

  isValidField(field: string): boolean{
    this.getErrorMessage(field);
    return(
      (this.baseFormDetails.get(field)?.touched || this.baseFormDetails.get(field)?.dirty) && 
      !this.baseFormDetails.get(field)?.valid
    )!;
  }


  private getErrorMessage(field:string): string{
    let message = "" || '';
    if(this.baseFormDetails.get(field)?.errors?.required){
      message = 'you must enter a value';
    }else if(this.baseFormDetails.get(field)?.hasError('pattern')){
      message = 'Not a valid email';
    }else if(this.baseFormDetails.get(field)?.hasError('minlength')){
      const minLength = this.baseFormDetails.get(field)?.errors?.minlength.requiredLength;
      message = `this field must be longer than ${minLength} characters`;
    }
    return this.errorMessage = message;
  }

}