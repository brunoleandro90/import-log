import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from 'ngx-custom-validators';
import { FormBaseComponent } from '../../shared/base-components/form-base.component';
import { Usuario } from '../../shared/models/usuario';
import { AuthService } from '../../shared/services/auth.service';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { NewComponent } from '../new/new.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];

  errors: any[] = [];
  usuarioForm!: FormGroup;
  usuario!: Usuario;
  returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private snackBarService: SnackBarService,
    private authService: AuthService) {

    super();

    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'E-mail inválido'
      },
      password: {
        required: 'Informe a senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres'
      }
    };

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];

    super.configurarMensagensValidacaoBase(this.validationMessages);
  }

  ngOnInit(): void {

    this.usuarioForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, CustomValidators.rangeLength([6, 15])]]
    });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormularioBase(this.formInputElements, this.usuarioForm);
  }

  onLogin() {
    if (this.usuarioForm.dirty && this.usuarioForm.valid) {
      this.usuario = Object.assign({}, this.usuario, this.usuarioForm.value);

      this.authService.login(this.usuario)
        .subscribe(
          sucesso => { this.onSuccess(sucesso) },
          falha => { this.onError(falha) }
        );
    }
  }

  onNew() {
    let config: MatDialogConfig = {
      maxWidth: '75vw',
      maxHeight: '75vh',
      width: '750px',
      disableClose: true
    };
    const dialogRef = this.dialog.open(NewComponent, config);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  private onSuccess(response: any) {
    this.usuarioForm.reset();
    this.errors = [];

    this.authService.LocalStorage.setLoggedUser(response);

    this.snackBarService.open('Login realizado com sucesso!', 'Ok');

    this.router.navigate(['/batch']);
  }

  private onError(response: any) {
    this.errors = response.error.errors;
    this.snackBarService.open('Ocorreu um erro! :(', 'Ok');
  }
}
