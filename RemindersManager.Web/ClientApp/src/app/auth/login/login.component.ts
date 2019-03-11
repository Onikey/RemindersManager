import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public form: FormGroup;
    constructor(private fb: FormBuilder, private authService: AuthenticationService) { }

    ngOnInit() {
        this.form = this.fb.group({
            email: ['', Validators.required],
            password: ['', [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(24),
                Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$')
            ]]
        });
    }

    public onSubmit() {
        if (this.form.valid) {
            this.authService.login(this.form.value);
        }
    }
}
