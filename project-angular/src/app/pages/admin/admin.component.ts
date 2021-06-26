import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalConsultComponent } from './components/modal-consult/modal-consult.component';
import { ConsultsService } from './services/consults.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
  
export class AdminComponent implements OnInit, AfterViewInit, OnDestroy{

  displayedColumns: string[] = ['idBoleta', 'fechaHora', 'idUser', 'palabraClaveConsulta1', 'palabraClaveConsulta2', 
  'asuntoDetallado', 'ipCompu', 'cantidadCambios', 'idClasificador'];
  dataSource = new MatTableDataSource();

  private destroy$= new Subject<any>();

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  constructor(private consultSvc:ConsultsService, private dialog:MatDialog) {}

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

  // onDelete(userId: number): void {
  //   if (window.confirm('Do you really want remove this user')) {
  //     this.userSvc
  //       .deleteUser(userId)
  //       .pipe(takeUntil(this.destroy$))
  //       .subscribe((res) => {
  //         window.alert(res);
  //         // Update result after deleting the user.
  //         // this.userSvc.getAllUsers().subscribe((users) => {
  //         //   this.dataSource.data = users;
  //         // });
  //       });
  //   }
  // }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.consultSvc.getAllConsults().subscribe((consults) => {
      this.dataSource.data = consults;
    });
  }

  onOpenModalConsults(consult: any): void {
    console.log('Consult ->', consult);
    this.dialog.open(ModalConsultComponent,{
      height: '600px',
      width: '800px',
      hasBackdrop: false,
      data: {title: 'New consult', consult},
    });
  }

}
