import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html'
})
export class AddComponent {

  addForm: FormGroup;
  wait: boolean = false;

  constructor(public dialogRef: MatDialogRef<AddComponent>,
    private fb: FormBuilder) {
    this.addForm = this.fb.group({
      ip: ['', [Validators.required]],
      date: ['', [Validators.required]],
      method: ['', [Validators.required]],
      url: ['', [Validators.required]],
      httpVersion: ['', [Validators.required]],
      httpStatus: ['', [Validators.required]],
      length: ['', [Validators.required]],
      referer: ['', [Validators.required]],
      userAgent: ['', [Validators.required]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirm() {
    this.wait = true;
    const { value, valid } = this.addForm;
    if (valid) {
      this.dialogRef.close(value);
    }
    this.wait = false;
  }
}
