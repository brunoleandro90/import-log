import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CustomValidators } from 'ngx-custom-validators';
import { FormBaseComponent } from 'src/app/shared/base-components/form-base.component';
import { Usuario } from 'src/app/shared/models/usuario';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss']
})
export class NewAccountComponent extends FormBaseComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];

  errors: any[] = [];
  newAccountForm!: FormGroup;
  usuario!: Usuario;

  constructor(private router: Router,
    public fb: FormBuilder,
    private snackBarService: SnackBarService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<NewAccountComponent>
  ) {

    super();

    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'E-mail inválido'
      },
      password: {
        required: 'Informe a senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres'
      },
      confirmPassword: {
        required: 'Informe a senha novamente',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
        equalTo: 'As senhas não conferem'
      }
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);
  }

  ngOnInit(): void {

    let senha = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15])]);
    let senhaConfirm = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15]), CustomValidators.equalTo(senha)]);

    this.newAccountForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: senha,
      confirmPassword: senhaConfirm
    });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormularioBase(this.formInputElements, this.newAccountForm);
  }

  onSave() {
    if (this.newAccountForm.dirty && this.newAccountForm.valid) {
      this.usuario = Object.assign({}, this.usuario, this.newAccountForm.value);

      this.authService.create(this.usuario)
        .subscribe(
          sucesso => { this.onSuccess(sucesso) },
          falha => { this.onError(falha) }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  private onSuccess(response: any) {
    this.newAccountForm.reset();
    this.errors = [];

    this.authService.LocalStorage.setLoggedUser(response);

    this.onClose();

    this.snackBarService.open('Registro realizado com Sucesso!', 'Ok');

    this.router.navigate(['/batch']);
  }

  private onError(response: any) {
    this.errors = response.error.errors;
    this.snackBarService.open('Ocorreu um erro! :(', 'Ok');
  }
}
