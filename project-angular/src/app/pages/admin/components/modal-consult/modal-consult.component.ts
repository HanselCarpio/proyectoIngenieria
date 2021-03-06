import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BaseFormDetails } from '@app/shared/utils/base-form-details';

import { BaseFormConsult } from '@shared/utils/base-form-consult';
import { ConsultsService } from '../../services/consults.service';
import { DetailsService } from '../../services/details.service';
enum Action {
  // EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-modal-consult',
  templateUrl: './modal-consult.component.html',
  styleUrls: ['./modal-consult.component.scss']
})
export class ModalConsultComponent implements OnInit {

  dataSource = new MatTableDataSource();
  actionTODO = Action.NEW;
  showPasswordField = true;
  hide = true;
  fileName = '';
  constructor(
  @Inject(MAT_DIALOG_DATA) public data: any,
  public consultForm: BaseFormConsult,
  public detailsForm: BaseFormDetails,
  private consultSvc: ConsultsService,
  private detailSvc: DetailsService,
  private http: HttpClient
  ) { }

  ngOnInit(): void {
    // if (this.data?.user.hasOwnProperty('idUser')) {
      // this.actionTODO = Action.EDIT;
      // this.showPasswordField = false;
      // this.consultForm.baseForm.get('password')?.setValidators(null);
      // this.consultForm.baseForm.updateValueAndValidity();
      // this.data.title = 'Edit user';
      // this.pathFormData();
    // }
  }

  onFileSelected(event:any) {
    const file:File = event.target.files[0];
    if (file) {
        this.fileName = file.name;
        const formData = new FormData();
        formData.append("thumbnail", file);
        const upload$ = this.http.post("/api/thumbnail-upload", formData);
        upload$.subscribe();
    }
  }

  onSaveConsult(): void {
    const formValue = this.consultForm.baseForm.value;
    const formValueDetails = this.detailsForm.baseFormDetails.value;
    console.log('consult ->', formValue);
    console.log('details ->', formValueDetails);
    if (this.actionTODO === Action.NEW) {
      this.consultSvc.newConsult(formValue).subscribe((res) => {
        console.log('New ', res);
      });
      this.detailSvc.newDetails(formValueDetails).subscribe((res) => {
        console.log('New ', res);
      });
      // if (this.actionTODO === Action.NEW) {
        
    } else {
      // const userId = this.data?.user?.idUser;
      // this.userSvc.updateUser(userId, formValue).subscribe((res) => {
        console.log('Error');
      // });
    }
  }

  checkField(field: string): boolean {
    return this.consultForm.isValidField(field);
  }

  // private pathFormData(): void {
  //   this.userForm.baseForm.patchValue({
  //     name: this.data?.user?.name,
  //     lastname: this.data?.user?.lastname,
  //     role: this.data?.user?.role,
  //     gender: this.data?.user?.gender,
  //     cedula: this.data?.user?.cedula,
  //     birthday: this.data?.user?.birthday,
  //     idDepto: this.data?.user?.idDepto,
  //     correo: this.data?.user?.correo,
  //     cel: this.data?.user?.cel
  //   });
  // }
}
