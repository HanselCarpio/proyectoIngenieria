import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BaseFormAnswer } from '@app/shared/utils/base-form-answer';
import { BaseFormConsult } from '@app/shared/utils/base-form-consult';
import { LegalAnswerService } from '../../services/legal-answer.service';


enum Action {
  // EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-modal-answer',
  templateUrl: './modal-answer.component.html',
  styleUrls: ['./modal-answer.component.scss']
})
export class ModalAnswerComponent implements OnInit {

  dataSource = new MatTableDataSource();
  actionTODO = Action.NEW;
  showPasswordField = true;
  hide = true;
  fileName = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public answerForm: BaseFormAnswer,
    public consultForm: BaseFormConsult,
    private answerSvc: LegalAnswerService,
    private http: HttpClient
  ) { }


  ngOnInit(): void {
    if (this.data?.consult.hasOwnProperty('idBoleta')) {
      this.actionTODO = Action.NEW;
      // this.showPasswordField = false;
      // this.answerForm.baseFormAnswer.get('password')?.setValidators(null);
      // this.consultForm.baseForm.updateValueAndValidity();
      this.data.title = 'Edit user';
      this.pathFormData();
    }
  }

  onSaveAnswer(): void {
    const formValue = this.answerForm.baseFormAnswer.value;
    console.log('Answer ->', formValue);
    if (this.actionTODO === Action.NEW) {
      this.answerSvc.newAnswer(formValue).subscribe((res) => {
        console.log('New ', res);
      });        
    } else {
      // const userId = this.data?.user?.idUser;
      // this.userSvc.updateUser(userId, formValue).subscribe((res) => {
        console.log('Error');
      // });
    }
  }

  checkField(field: string): boolean {
    return this.answerForm.isValidField(field);
  }

  private pathFormData(): void {
    this.answerForm.baseFormAnswer.patchValue({
      idBoleta: this.data?.consult?.idBoleta,
    });
  }
}
