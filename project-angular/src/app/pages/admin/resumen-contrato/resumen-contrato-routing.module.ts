import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumenContratoComponent } from './resumen-contrato.component';

const routes: Routes = [{ path: '', component: ResumenContratoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResumenContratoRoutingModule { }
