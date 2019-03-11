import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/auth';

@Component({
    selector: 'app-forget-password',
    templateUrl: './forget-password.component.html',
    styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
    public form: FormGroup;
    constructor(private fb: FormBuilder, private authService: AuthenticationService) { }

    ngOnInit() {
        this.form = this.fb.group({
            email: ['', Validators.required]
        });
    }

    public onSubmit() {
        if (this.form.valid) {
            this.authService.forgetPassword(this.form.value);
        }
    }
}
