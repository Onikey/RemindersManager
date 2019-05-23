import { HttpHeaders, HttpHandler, HttpRequest, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpObserve } from '@angular/common/http/src/client';

import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../auth';
import { AppHttpClient } from './app-http-client.service';

@Injectable()
export class AuthHttpClient extends AppHttpClient {
  constructor(httpHandler: HttpHandler, private authenticationService: AuthenticationService) {
    super(httpHandler);
  }

  public request(first: string | HttpRequest<any>, url?: string, options: {
    body?: any,
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: HttpObserve,
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    options = this.addAuthHeader(options);
    if (options) {
      return super.request(first, url, options)
        .pipe(catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.authenticationService.logout();
          }
          return of(err);
        }));
    } else {
      return this.getUnauthorizedResult();
    }
  }

  private addAuthHeader(options: {
    body?: any,
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: HttpObserve,
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  } = {}): {
    body?: any,
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: HttpObserve,
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  } {
    if (options === undefined) {
      options = {};
    }

    if (options.headers === undefined) {
      options.headers = new HttpHeaders();
    }

    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.token) {
      if (!(options.headers instanceof HttpHeaders)) {
        options.headers = new HttpHeaders(options.headers);
      }
      options.headers = options.headers.append('Authorization', `Bearer ${currentUser.token}`);
      return options;
    } else {
      this.authenticationService.logout();
      return undefined;
    }
  }

  private getUnauthorizedResult(): Observable<never> {
    return throwError('User is unauthorized!');
  }
}
