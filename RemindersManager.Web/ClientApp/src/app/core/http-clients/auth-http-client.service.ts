import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { AuthenticationService } from '../auth';
import { AppHttpClient, IRequestOptions } from '.';

@Injectable()
export class AuthHttpClient {

    // Extending the AppHttpClient through the Angular DI.
    constructor(protected http: AppHttpClient, protected authenticationService: AuthenticationService) {
        // If you don't want to use the extended versions in some cases you can access the public property and use the original one.
        // for ex. this.httpClient.http.get(...)
    }

    /**
     * GET request
     * @param endPoint it doesn't need / in front of the end point
     * @param options options of the request like headers, body, etc.
     * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Object`.
     */
    public get<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
        options = this.addAuthHeader(options);
        if (options) {
            return this.http.get<T>(endPoint, options);
        } else {
            return this.getUnauthorizedResult();
        }
    }

    /**
     * POST request
     * @param endPoint end point of the api
     * @param params body of the request.
     * @param options options of the request like headers, body, etc.
     * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Object`.
     */
    public post<T>(endPoint: string, params: Object, options?: IRequestOptions): Observable<T> {
        options = this.addAuthHeader(options);
        if (options) {
            return this.http.post<T>(endPoint, params, options);
        } else {
            return this.getUnauthorizedResult();
        }
    }

    /**
     * PUT request
     * @param endPoint end point of the api
     * @param params body of the request.
     * @param options options of the request like headers, body, etc.
     * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Object`.
     */
    public put<T>(endPoint: string, params: Object, options?: IRequestOptions): Observable<T> {
        options = this.addAuthHeader(options);
        if (options) {
            return this.http.put<T>(endPoint, params, options);
        } else {
            return this.getUnauthorizedResult();
        }
    }

    /**
     * DELETE request
     * @param endPoint end point of the api
     * @param options options of the request like headers, body, etc.
     * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Object`.
     */
    public delete<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
        options = this.addAuthHeader(options);
        if (options) {
            return this.http.delete<T>(endPoint, options);
        } else {
            return this.getUnauthorizedResult();
        }
    }

    private addAuthHeader(options: IRequestOptions): IRequestOptions {
        if (options === undefined) {
            options = {};
        }

        if (options.headers === undefined) {
            options.headers = new HttpHeaders();
        }

        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.token) {
            options.headers = options.headers.append('Authorization', `Bearer ${currentUser.token}`);
            return options;
        } else {
            this.authenticationService.logout();
            location.reload(true);
            return undefined;
        }
    }

    private getUnauthorizedResult(): Observable<never> {
        return throwError('User is unauthorized!');
    }
}
