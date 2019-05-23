import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule } from '@angular/material';

import { AuthRoutingModule } from './auth.routing';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,

    AuthRoutingModule
  ],
  declarations: [
    LoginComponent,
    RegistrationComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent
  ],
})
export class AuthModule { }
