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

  batch: Batch = new Batch();

  public displayedColumns = ['fileName', 'numberLogs', 'delete'];

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

  onDelete = (id: string) => {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Ao excluir o batch, excluirá automaticamente todos os logs vinculados a ele. Deseja continuar?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.batchService.delete(id)
          .subscribe(
            success => { this.onDeleteSuccess(id) },
            fail => { this.onError(fail) }
          );
      }
    });
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      for (let index = 0; index < event.target.files.length; index++) {
        this.batch = event.target.files[index];
      }
      this.uploadFile();
    }
  }

  private uploadFile(): void {
    this.readAndUploadFile(this.batch);
  }

  private readAndUploadFile(batch: any) {
    let file = new Batch();

    file.fileName = batch.name;

    let reader = new FileReader();

    reader.onload = () => {
      file.fileAsBase64 = reader.result!.toString();

      this.batchService.create(file)
        .subscribe(
          success => { this.onAddSuccess(success) },
          fail => { this.onError(fail) }
        );
    }
    reader.readAsDataURL(batch);
  }

  private onDeleteSuccess(response: any) {
    let index: number = this.dataSource.data.findIndex(d => d.id === response.id);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
    this.snackBarService.open('Batch excluído com sucesso! :)', 'Ok');
  }

  private onAddSuccess(response: any) {
    this.dataSource.data.push(response);
    this.dataSource._updateChangeSubscription();
    this.snackBarService.open('Batch criado com sucesso! :)', 'Ok');
  }

  private onError(response: any) {
    this.snackBarService.open('Ocorreu erro ao importar o batch!', 'Ok');
  }
}