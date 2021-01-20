import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BatchService } from 'src/app/shared/services/batch.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html'
})
export class UploadComponent implements OnInit {

  uploadForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private batchService: BatchService,
    private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.uploadForm = this.fb.group({
      batchFile: ['']
    });
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('batchFile')!.setValue(file);
      this.onUploadFile();
    }
  }

  onUploadFile() {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('batchFile')!.value);

    this.batchService.create(formData)
      .subscribe(
        success => { this.onSuccess(success) },
        fail => { this.onError(fail) }
      );
  }

  private onSuccess(response: any) {
    //this.dataSource.data.push(response);
    //this.dataSource._updateChangeSubscription();
    this.snackBarService.open('Batch criado com sucesso! :)', 'Ok');
  }

  private onError(response: any) {
    this.snackBarService.open('Ocorreu erro ao importar o batch!', 'Ok');
  }

}
