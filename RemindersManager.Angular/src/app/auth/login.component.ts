import { Component } from '@angular/core';


import { AuthService } from '../core/auth/auth.service';
import { SpinnerService } from '../core/spinner/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  constructor(private authService: AuthService, private spinner: SpinnerService) { }

  login() {
    this.spinner.show();
    this.authService.login();
  }
}


