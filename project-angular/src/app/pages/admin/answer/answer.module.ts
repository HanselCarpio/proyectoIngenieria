import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnswerRoutingModule } from './answer-routing.module';
import { AnswerComponent } from './answer.component';
import { MaterialModule } from '@app/material.module';


@NgModule({
  declarations: [
    AnswerComponent
  ],
  imports: [
    CommonModule,
    AnswerRoutingModule,
    MaterialModule
  ]
})
export class AnswerModule { }
