import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { RemindersService } from '../services/reminders.service';

import Reminder from '../models/reminder.model';

@Component({
    selector: 'app-reminder-form',
    templateUrl: './reminder-form.component.html',
    styleUrls: ['./reminder-form.component.css']
})
export class ReminderFormComponent implements OnInit {

    private reminder: Reminder;

    public form: FormGroup;
    public submitted = false;
    public isNewItem = true;

    public now = new Date();

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private dataService: RemindersService) { }

    ngOnInit() {
        this.reminder = this.route.snapshot.data['reminder'];

        if (this.reminder) {
            this.isNewItem = false;
        } else {
            this.reminder = new Reminder();
        }

        this.form = this.formBuilder.group({
            subject: [this.reminder.subject, Validators.required],
            notes: [this.reminder.notes],
            remindDate: [this.reminder.remindDate, Validators.required]
        });
    }

    get f() { return this.form.controls; }

    public onSubmit() {
        this.submitted = true;

        if (this.form.invalid) {
            return;
        }

        const observable = this.isNewItem
            ? this.dataService.create({
                id: null,
                isActive: null,
                notes: this.f.notes.value,
                subject: this.f.subject.value,
                remindDate: this.f.remindDate.value
            })
            : this.dataService.update({
                id: this.reminder.id,
                isActive: this.reminder.isActive,
                notes: this.f.notes.value,
                subject: this.f.subject.value,
                remindDate: this.f.remindDate.value
            });

        observable.subscribe(
            (res: any) => {
                this.router.navigate(['/dashboard']);
            },
            (error) => {
                alert(`We can't save your reminder :(`);
            });
    }
}
