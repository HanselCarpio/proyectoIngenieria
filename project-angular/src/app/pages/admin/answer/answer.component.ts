import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LegalAnswerService } from '../services/legal-answer.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit, AfterViewInit, OnDestroy {


  displayedColumns: string[] = ['idRespuesta', 'descripcion', 'detalleRespuesta', 'fechaHoraRespuesta', 'idUserRespuesta', 'ipCompu', 'idBoleta', 'actions'];
  dataSource = new MatTableDataSource();

  private destroy$= new Subject<any>();

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  constructor(private answerSvc:LegalAnswerService, private dialog:MatDialog) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  onDelete(idRespuesta: number): void {
    if (window.confirm('Do you really want remove this answer')) {
      this.answerSvc
        .deleteAnswer(idRespuesta)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          window.alert(res);
          // Update result after deleting the user.
          this.answerSvc.getAllAnswer().subscribe((answers) => {
            this.dataSource.data = answers;
          });
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.answerSvc.getAllAnswer().subscribe((answers) => {
      this.dataSource.data = answers;
    });
  }






}
