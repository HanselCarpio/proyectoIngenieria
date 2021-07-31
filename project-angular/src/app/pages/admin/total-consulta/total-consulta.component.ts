import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalComponent } from '../components/modal/modal.component';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-total-consulta',
  templateUrl: './total-consulta.component.html',
  styleUrls: ['./total-consulta.component.scss']
})
export class TotalConsultaComponent implements OnInit, AfterViewInit, OnDestroy {


    displayedColumns: string[] = ["departamento","total"];
    dataSource = new MatTableDataSource();
  
    private destroy$ = new Subject<any>();

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  constructor(private reportSvc: ReportService, private dialog: MatDialog) { }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.reportSvc.getTotalConsultas().subscribe((totalConsultas) => {
      this.dataSource.data = totalConsultas;
    });
  }

}