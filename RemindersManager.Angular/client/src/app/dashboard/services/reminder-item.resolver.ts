import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { RemindersService } from './reminders.service';

import Reminder from '../models/reminder.model';

@Injectable()
export class ReminderItemResolver implements Resolve<Reminder> {

    constructor(private _service: RemindersService) { }
    resolve(
        route: ActivatedRouteSnapshot
    ): Observable<any> | Promise<any> | any {
        if (route.params && route.params['id']) {
            const id: string = route.params['id'];
            return this._service.getById(id);
        } else {
            return undefined;
        }
    }
}
