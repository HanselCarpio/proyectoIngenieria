import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumenConsultaComponent } from './resumen-consulta.component';

const routes: Routes = [{ path: '', component: ResumenConsultaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResumenConsultaRoutingModule { }
