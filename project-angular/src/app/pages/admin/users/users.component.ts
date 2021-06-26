import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalComponent } from '../components/modal/modal.component';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['idUser', 'name', 'lastname', 'role', 'gender', 'cedula', 'birthday', 'idDepto', 'correo', 'cel', 'actions'];
  dataSource = new MatTableDataSource();

  private destroy$= new Subject<any>();

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  constructor(private userSvc:UsersService, private dialog:MatDialog) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  // onDelete(userId: number):void{
  //   if(window.confirm('Do you really want remove this user')){
  //     this.userSvc.deleteUser(userId).subscribe(res =>{
  //       window.alert(res.message);
  //     })
  //   }
  // }

  onDelete(userId: number): void {
    if (window.confirm('Do you really want remove this user')) {
      this.userSvc
        .deleteUser(userId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          window.alert(res);
          // Update result after deleting the user.
          this.userSvc.getAllUsers().subscribe((users) => {
            this.dataSource.data = users;
          });
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.userSvc.getAllUsers().subscribe((users) => {
      this.dataSource.data = users;
    });
  }

  onOpenModal(user: any): void {
    console.log('User ->', user);
    this.dialog.open(ModalComponent,{
      height: '600px',
      width: '800px',
      hasBackdrop: false,
      data: {title: 'New user', user},
    });
  }

}
