import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/auth';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
    public form: FormGroup;
    constructor(private fb: FormBuilder, private authService: AuthenticationService) { }

    ngOnInit() {
        this.form = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
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
            this.authService.register(this.form.value);
        }
    }
}
