import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Batch } from 'src/app/shared/models/batch';
import { BatchService } from 'src/app/shared/services/batch.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['fileName', 'length', 'download', 'delete'];

  public dataSource = new MatTableDataSource<Batch>();

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private batchService: BatchService,
    private snackBarService: SnackBarService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
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
    this.batchService.getAll()
      .subscribe(res => {
        this.dataSource.data = res as Batch[];
      })
  }

  onDownload(batch: Batch) {
    const linkSource = `data:${batch.contentType};base64, ${batch.bytes}`;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = batch.fileName;
    downloadLink.click();
  }

  onDelete = (id: string) => {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Ao excluir o batch, excluirá automaticamente todos os logs vinculados a ele. Deseja continuar?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.batchService.delete(id)
          .subscribe(
            success => { this.onSuccess(id) },
            fail => { this.onError(fail) }
          );
      }
    });
  }

  private onSuccess(response: any) {
    let index: number = this.dataSource.data.findIndex(d => d.id === response.id);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
    this.snackBarService.open('Batch excluído com sucesso! :)', 'Ok');
  }

  private onError(response: any) {
    console.log(response);
    this.snackBarService.open('Ocorreu erro ao excluir o batch!', 'Ok');
  }
}