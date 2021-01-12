import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Batch } from 'src/app/shared/models/batch';
import { BatchService } from 'src/app/shared/services/batch.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.scss']
})
export class BatchComponent implements OnInit, AfterViewInit {

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
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  getAll = () => {
    this.batchService.getAll()
      .subscribe(res => {
        this.dataSource.data = res as Batch[];
      })
  }

  onClickUpload() {

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
            success => { this.onSuccess(success) },
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
          success => { this.onSuccess(success) },
          fail => { this.onError(fail) }
        );
    }
    reader.readAsDataURL(batch);
  }

  private onSuccess(success: any) {
    this.getAll();
  }

  private onError(fail: any) {
    this.snackBarService.openError(fail);
  }
}
