import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { UserManager, UserManagerSettings, User } from 'oidc-client';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly clientSettings: UserManagerSettings = {
    authority: environment.baseAuthUrl,
    client_id: 'angular',
    redirect_uri: `${origin}/auth/callback`,
    post_logout_redirect_uri: `${origin}/`,
    response_type: 'id_token token',
    scope: 'api openid profile email',
    filterProtocolClaims: true,
    loadUserInfo: true,
    automaticSilentRenew: true,
    silent_redirect_uri: `${origin}/silent-refresh.html`
  };


  private manager = new UserManager(this.clientSettings);

  public get isAuthenticated(): boolean {
    return this.user != null && !this.user.expired;
  }

  get authorizationHeaderValue(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  get name(): string {
    return this.user != null ? this.user.profile.name : '';
  }

  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private user: User | null;



  constructor() {
    this.manager.getUser().then(user => {
      this.user = user;
      this._authNavStatusSource.next(this.isAuthenticated);
    });
  }

  public login() {
    return this.manager.signinRedirect();
  }

  async completeAuthentication() {
    this.user = await this.manager.signinRedirectCallback();
    this._authNavStatusSource.next(this.isAuthenticated);
  }

  signout() {
    this.manager.signoutRedirect();
  }
}
