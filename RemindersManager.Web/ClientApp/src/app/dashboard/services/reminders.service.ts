import { Injectable } from '@angular/core';
import { BaseAppDataService } from 'src/app/shared/base-app-data.service';
import Reminder from '../models/reminder.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class RemindersService extends BaseAppDataService {
    constructor(httpClient: HttpClient) {
        super(httpClient);
        this.baseApi = this.baseApi + '/reminders';
    }

    public getAll() {
        return this.http.get<Reminder[]>(this.baseApi);
    }

    public getById(id: string) {
        return this.http.get<Reminder[]>(`${this.baseApi}/${id}`);
    }

    public create(reminder: Reminder) {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post(this.baseApi, JSON.stringify(reminder), { headers: reqHeader });
    }

    public update(reminder: Reminder) {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post(`${this.baseApi}/${reminder.id}`, JSON.stringify(reminder), { headers: reqHeader });
    }

    public delete(id: string) {
        return this.http.delete(`${this.baseApi}/${id}`);
    }

    public activate(id: string) {
        return this.http.post(`${this.baseApi}/${id}/activate`, null);
    }

    public deactivate(id: string) {
        return this.http.post(`${this.baseApi}/${id}/deactivate`, null);
    }
}
