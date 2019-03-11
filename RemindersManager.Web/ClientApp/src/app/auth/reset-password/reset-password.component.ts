import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/auth';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    public form: FormGroup;
    constructor(private fb: FormBuilder, private authService: AuthenticationService) { }

    ngOnInit() {
        this.form = this.fb.group({
            password: ['', [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(24),
                Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$')
            ]],
            confirmPassword: ['', [Validators.required, this.checkPasswords]]
        });
    }

    private checkPasswords(group: FormGroup) { // here we have the 'passwords' group
        const pass = group.controls.password.value;
        const confirmPass = group.controls.confirmPassword.value;

        return pass === confirmPass ? null : { notSame: true };
    }

    public onSubmit() {
        if (this.form.valid) {
            this.authService.resetPassword(this.form.value);
        }
    }
}
