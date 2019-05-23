import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppHttpClient } from '../http-clients/app-http-client.service';

import { User } from './user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private readonly currentUserToken = 'currentUser';
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: AppHttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(this.currentUserToken)));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public login(model: { username: string, password: string }) {
    return this.http.post<any>(`/users/authenticate`, { model })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem(this.currentUserToken, JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  public forgetPassword(model: { email: string }): any {
    throw new Error('Method not implemented.');
  }
  public resetPassword(model: { password: string, confirmPassword: string }): any {
    throw new Error('Method not implemented.');
  }
  public register(model: {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  }): any {
    throw new Error('Method not implemented.');
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(this.currentUserToken);
    this.currentUserSubject.next(null);
  }
}
