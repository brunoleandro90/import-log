import { Component, ElementRef, Inject, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Log } from 'src/app/shared/models/log';
import { LogService } from 'src/app/shared/services/log.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { LogBaseComponent } from '../log-form.base.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent extends LogBaseComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];

  constructor(
    private fb: FormBuilder,
    private logService: LogService,
    private snackBarService: SnackBarService,
    private router: Router,
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public log: Log) {

    super();

    //this.log = this.route.snapshot.data['log'];
  }

  ngOnInit(): void {
    this.logForm = this.fb.group({
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

    this.logForm.patchValue({
      ip: this.log.ip,
      date: this.log.date,
      method: this.log.method,
      url: this.log.url,
      httpVersion: this.log.httpVersion,
      httpStatus: this.log.httpStatus,
      length: this.log.length,
      referer: this.log.referer,
      userAgent: this.log.userAgent
    });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.logForm.dirty && this.logForm.valid) {
      this.log = Object.assign({}, this.log, this.logForm.value);

      this.logService.update(this.log)
        .subscribe(
          sucesso => { this.onSuccess(sucesso) },
          falha => { this.onError(falha) }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  onSuccess(response: any) {
    this.logForm.reset();
    this.errors = [];
    this.dialogRef.close();
    this.snackBarService.open('Log editado com sucesso! :)', 'Ok');
    this.router.navigate(['/log']);
  }

  onError(fail: any) {
    this.errors = fail.error.errors;
    this.snackBarService.open('Ocorreu um erro! :(', 'Ok');
  }

}
