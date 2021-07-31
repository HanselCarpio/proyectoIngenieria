import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: '', component: AdminComponent }, 
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'answer', loadChildren: () => import('./answer/answer.module').then(m => m.AnswerModule) },
  { path: 'report', loadChildren: () => import('./report/report.module').then(m => m.ReportModule) },
  { path: 'totalConsulta', loadChildren: () => import('./total-consulta/total-consulta.module').then(m => m.TotalConsultaModule) },
  { path: 'resumenConsulta', loadChildren: () => import('./resumen-consulta/resumen-consulta.module').then(m => m.ResumenConsultaModule) },
  { path: 'resumenContrato', loadChildren: () => import('./resumen-contrato/resumen-contrato.module').then(m => m.ResumenContratoModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
