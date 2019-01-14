import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { RemindersService } from './reminders.service';

import Reminder from '../models/reminder.model';

@Injectable()
export class ReminderListResolver implements Resolve<Reminder[]> {

    constructor(private _service: RemindersService) { }
    resolve(): Observable<any> | Promise<any> | any {
        return this._service.getAll();
    }
}
