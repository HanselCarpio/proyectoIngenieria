import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResumenConsultaRoutingModule } from './resumen-consulta-routing.module';
import { ResumenConsultaComponent } from './resumen-consulta.component';
import { MaterialModule } from '@app/material.module';


@NgModule({
  declarations: [
    ResumenConsultaComponent
  ],
  imports: [
    CommonModule,
    ResumenConsultaRoutingModule,
    MaterialModule
  ]
})
export class ResumenConsultaModule { }
