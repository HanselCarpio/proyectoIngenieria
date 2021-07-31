import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResumenContratoRoutingModule } from './resumen-contrato-routing.module';
import { ResumenContratoComponent } from './resumen-contrato.component';
import { MaterialModule } from '@app/material.module';


@NgModule({
  declarations: [
    ResumenContratoComponent
  ],
  imports: [
    CommonModule,
    ResumenContratoRoutingModule,
    MaterialModule
  ]
})
export class ResumenContratoModule { }
