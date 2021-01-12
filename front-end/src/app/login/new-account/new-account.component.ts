import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NewUser } from 'src/app/shared/models/new-user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss']
})
export class NewAccountComponent {
  newAccountForm: FormGroup;
  newUser: NewUser = new NewUser();
  wait: boolean = false;

  constructor(private router: Router,
    public fb: FormBuilder,
    private snackBarService: SnackBarService,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    public dialogRef: MatDialogRef<NewAccountComponent>
  ) {
    this.newAccountForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSave() {
    if (this.newAccountForm.dirty && this.newAccountForm.valid) {
      this.wait = true;

      this.newUser = Object.assign({}, this.newUser, this.newAccountForm.value);

      this.authService.create(this.newUser)
        .subscribe(
          success => { this.onSuccess(success) },
          fail => { this.onError(fail) }
        );
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  private onSuccess(success: any) {
    this.newAccountForm.reset();

    this.localStorageService.setLoggedUser(success.data);

    this.onClose();

    this.router.navigate(['/batch']);
  }

  private onError(fail: any) {
    this.wait = false;
    this.snackBarService.openError(fail);
  }

}
