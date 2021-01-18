import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Log } from 'src/app/shared/models/log';
import { LogService } from 'src/app/shared/services/log.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { AddComponent } from '../add/add.component';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit, AfterViewInit {

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
    if (value) {
      this.dataSource.filter = value.trim().toLocaleLowerCase();
    }
  }

  getAll = () => {
    this.logService.getAll()
      .subscribe(res => {
        this.dataSource.data = res as Log[];
      })
  }

  onAdd() {
    this.dialog.open(AddComponent, {
      disableClose: true
    });
  }

  onUpdate = (id: string) => {
    this.logService.getById(id)
      .subscribe(res => {

        let logEdit: Log = res as Log;

        this.dialog.open(EditComponent, {
          disableClose: true,
          data: logEdit
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
            success => { this.onSuccessDelete(success) },
            fail => { this.onErrorDelete(fail) }
          );
      }
    });
  }

  private onSuccessDelete(response: any) {
    let index: number = this.dataSource.data.findIndex(d => d.id === response.id);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
    this.snackBarService.open('Log excluído com sucesso! :)', 'Ok');
  }

  private onErrorDelete(fail: any) {
    this.snackBarService.open('Ocorreu erro ao excluir o log!', 'Ok');
  }

}
