import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from '../../services/users.service';

import { BaseFormUser } from '@shared/utils/base-form-user';
enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  actionTODO = Action.NEW;
  showPasswordField = true;
  hide = true;
  constructor(
  @Inject(MAT_DIALOG_DATA) public data: any,
  public userForm: BaseFormUser,
    private userSvc: UsersService
  ) { }

  ngOnInit(): void {
    if (this.data?.user.hasOwnProperty('idUser')) {
      this.actionTODO = Action.EDIT;
      this.showPasswordField = false;
      this.userForm.baseForm.get('password')?.setValidators(null);
      this.userForm.baseForm.updateValueAndValidity();
      this.data.title = 'Edit user';
      this.pathFormData();
    }
  }

  onSave(): void {
    const formValue = this.userForm.baseForm.value;
    console.log('user ->', formValue);
    if (this.actionTODO === Action.NEW) {
      console.log(formValue);
      this.userSvc.newUser(formValue).subscribe((res) => {
        console.log('New ', res);
      });
    } else {
      const userId = this.data?.user?.idUser;
      this.userSvc.updateUser(userId, formValue).subscribe((res) => {
        console.log('Update', res);
      });
    }
  }

  checkField(field: string): boolean {
    return this.userForm.isValidField(field);
  }

  private pathFormData(): void {
    this.userForm.baseForm.patchValue({
      name: this.data?.user?.name,
      lastname: this.data?.user?.lastname,
      role: this.data?.user?.role,
      gender: this.data?.user?.gender,
      cedula: this.data?.user?.cedula,
      birthday: this.data?.user?.birthday,
      idDepto: this.data?.user?.idDepto,
      correo: this.data?.user?.correo,
      cel: this.data?.user?.cel
    });
  }

}
