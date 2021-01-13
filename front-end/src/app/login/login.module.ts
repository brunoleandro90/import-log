import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { MaterialModule } from '../shared/modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NewAccountComponent } from './new-account/new-account.component';
import { SnackBarService } from '../shared/services/snack-bar.service';
import { AuthService } from '../shared/services/auth.service';


@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ],
  declarations: [LoginComponent, NewAccountComponent],
  providers: [AuthService, SnackBarService]
})
export class LoginModule { }