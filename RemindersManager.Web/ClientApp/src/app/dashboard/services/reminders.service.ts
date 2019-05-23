import { Injectable } from '@angular/core';
import Reminder from '../models/reminder.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthHttpClient } from 'src/app/core/http-clients';

@Injectable()
export class RemindersService {
  private readonly baseApi = '/reminders';

  constructor(private http: AuthHttpClient) { }

  public getAll(): Observable<Reminder[]> {
    return this.http.get<Reminder[]>(this.baseApi);
  }

  public getById(id: string): Observable<Reminder> {
    return this.http.get(`${this.baseApi}/${id}`).pipe(map((x: any) => {
      return {
        id: x.id,
        subject: x.subject,
        notes: x.notes,
        remindDate: new Date(x.remindDate),
        isActive: x.IsActive
      };
    }));
  }

  public create(reminder: Reminder): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.baseApi, JSON.stringify(reminder), { headers: reqHeader });
  }

  public update(reminder: Reminder): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put(`${this.baseApi}/${reminder.id}`, JSON.stringify(reminder), { headers: reqHeader });
  }

  public delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseApi}/${id}`);
  }

  public activate(id: string): Observable<any> {
    return this.http.post(`${this.baseApi}/${id}/activate`, null);
  }

  public deactivate(id: string): Observable<any> {
    return this.http.post(`${this.baseApi}/${id}/deactivate`, null);
  }
}
