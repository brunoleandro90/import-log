import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { config } from 'rxjs';
import { Log } from 'src/app/shared/models/log';
import { LogService } from 'src/app/shared/services/log.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['ip', 'date', 'method ', 'url', 'httpStatus', 'update', 'delete'];

  public dataSource = new MatTableDataSource<Log>();

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private logService: LogService,
    private snackBarService: SnackBarService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getAll();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  getAll = () => {
    this.logService.getAll()
      .subscribe(res => {
        this.dataSource.data = res as Log[];
      })
  }

  onAdd() {
    const dialogRef = this.dialog.open(AddComponent, {
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let logObj: Log = Object.assign(result);
        this.logService.create(logObj)
          .subscribe(
            success => { this.onSuccess(success) },
            fail => { this.onError(fail) }
          );
      }
    });
  }

  onUpdate = (id: string) => {
    let logEdit!: Log;
    this.logService.getById(id)
      .subscribe(res => {
        logEdit = res as Log;
        const dialogRef = this.dialog.open(EditComponent, {
          disableClose: true,
          data: logEdit
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            debugger;
            let logObj: Log = Object.assign(result);
            logObj.id = logEdit.id;
            this.logService.update(logObj.id, logObj)
              .subscribe(
                success => { this.onSuccess(success) },
                fail => { this.onError(fail) }
              );
          }
        });
      });
  }

  onDelete = (id: string) => {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Deseja realmente excluir o log?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.logService.delete(id)
          .subscribe(
            success => { this.onSuccess(success) },
            fail => { this.onError(fail) }
          );
      }
    });
  }

  private onSuccess(success: any) {
    this.getAll();
  }

  private onError(fail: any) {
    this.snackBarService.openError(fail);
  }

}
