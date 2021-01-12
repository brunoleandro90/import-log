import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Log } from 'src/app/shared/models/log';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent {
  editForm: FormGroup;
  wait: boolean = false;

  constructor(public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public logEdit: Log,
    private fb: FormBuilder) {
    this.editForm = this.fb.group({
      ip: [logEdit.ip, [Validators.required]],
      date: [logEdit.date, [Validators.required]],
      method: [logEdit.method, [Validators.required]],
      url: [logEdit.url, [Validators.required]],
      httpVersion: [logEdit.httpVersion, [Validators.required]],
      httpStatus: [logEdit.httpStatus, [Validators.required]],
      length: [logEdit.length, [Validators.required]],
      referer: [logEdit.referer, [Validators.required]],
      userAgent: [logEdit.userAgent, [Validators.required]]
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirm() {
    this.wait = true;
    const { value, valid } = this.editForm;
    if (valid) {
      this.dialogRef.close(value);
    }
    this.wait = false;
  }

}
