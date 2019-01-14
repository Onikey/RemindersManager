import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RemindersService } from '../services/reminders.service';

@Component({
    selector: 'app-reminder-create',
    templateUrl: './reminder-create.component.html',
    styleUrls: ['./reminder-create.component.css']
})
export class ReminderCreateComponent implements OnInit {

    public form: FormGroup;
    public submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private dataService: RemindersService) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            subject: ['', Validators.required],
            notes: [''],
            remindDate: [null, Validators.required]
        });
    }

    get f() { return this.form.controls; }

    public onSubmit() {
        this.submitted = true;

        if (this.form.invalid) {
            return;
        }
        this.dataService.create({
            id: null,
            isActive: null,
            notes: this.f.notes.value,
            subject: this.f.subject.value,
            remindDate: this.f.remindDate.value
        }).subscribe(
            () => {
                this.router.navigate(['/dashboard']);
            },
            () => {
                alert(`We can't save your reminder :(`);
            });
    }
}
