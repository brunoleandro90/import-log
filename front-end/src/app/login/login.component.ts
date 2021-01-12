import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Login } from '../shared/models/login';
import { AuthService } from '../shared/services/auth.service';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { SnackBarService } from '../shared/services/snack-bar.service';
import { NewAccountComponent } from './new-account/new-account.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  login: Login = new Login();
  wait: boolean = false;

  constructor(private router: Router,
    public fb: FormBuilder,
    public dialog: MatDialog,
    private snackBarService: SnackBarService,
    private authService: AuthService,
    private localStorageService: LocalStorageService) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.wait = true;
      this.login = Object.assign({}, this.login, this.loginForm.value);

      this.authService.login(this.login)
        .subscribe(
          success => { this.onSuccess(success) },
          fail => { this.onError(fail) }
        );
    }
  }

  onNewAccount() {
    let config: MatDialogConfig = {
      maxWidth: '75vw',
      maxHeight: '75vh',
      width: '750px',
      height: '60vh',
      disableClose: true
    };
    const dialogRef = this.dialog.open(NewAccountComponent, config);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  private onSuccess(success: any) {
    this.loginForm.reset();

    this.localStorageService.setLoggedUser(success.data)

    this.router.navigate(['/batch']);
  }

  private onError(fail: any) {
    this.wait = false;
    this.snackBarService.openError(fail);
  }
}
