import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'role', 'username'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  constructor(private userSvc:UsersService) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.userSvc.getAllUsers().subscribe((users) => {
      this.dataSource.data = users;
    });
  }

}
