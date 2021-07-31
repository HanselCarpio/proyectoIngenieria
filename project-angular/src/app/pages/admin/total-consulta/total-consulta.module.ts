import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TotalConsultaRoutingModule } from './total-consulta-routing.module';
import { TotalConsultaComponent } from './total-consulta.component';
import { MaterialModule } from '@app/material.module';


@NgModule({
  declarations: [
    TotalConsultaComponent
  ],
  imports: [
    CommonModule,
    TotalConsultaRoutingModule,
    MaterialModule
  ]
})
export class TotalConsultaModule { }
