import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ModalComponent } from './components/modal/modal.component';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalConsultComponent } from './components/modal-consult/modal-consult.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ModalAnswerComponent } from './components/modal-answer/modal-answer.component';


@NgModule({
  declarations: [
    AdminComponent,
    ModalComponent,
    ModalConsultComponent,
    ModalAnswerComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ]
})
export class AdminModule { }
