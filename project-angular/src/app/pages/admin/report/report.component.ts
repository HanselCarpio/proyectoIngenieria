import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalComponent } from '../components/modal/modal.component';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ["totalConsultas","totalProyectos","totalcAdmin","totalcPersonal","total"];
  dataSource = new MatTableDataSource();

  private destroy$= new Subject<any>();

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  constructor(private reportSvc:ReportService, private dialog:MatDialog) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.reportSvc.getAnualResume().subscribe((anualResume) => {
      this.dataSource.data = anualResume;
    });
  }

}
