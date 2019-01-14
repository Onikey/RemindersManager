import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { RemindersService } from '../services/reminders.service';

import Reminder from '../models/reminder.model';

@Component({
  selector: 'app-reminders-details',
  templateUrl: './reminders-details.component.html',
  styleUrls: ['./reminders-details.component.css']
})
export class RemindersDetailsComponent implements OnInit {

    public form: FormGroup;
    public submitted = false;
    private reminder: Reminder;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private dataService: RemindersService) { }

    ngOnInit() {
        this.reminder = this.route.snapshot.data['reminder'];

        if (!this.reminder) {
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
        this.dataService.update({
            id: this.reminder.id,
            isActive: this.reminder.isActive,
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
