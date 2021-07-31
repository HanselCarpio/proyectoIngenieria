import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TotalConsultaComponent } from './total-consulta.component';

const routes: Routes = [{ path: '', component: TotalConsultaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TotalConsultaRoutingModule { }
