import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { IRequestOptions } from '.';

@Injectable()
export class AppHttpClient {

    private api = environment.baseApi;

    // Extending the HttpClient through the Angular DI.
    constructor(protected http: HttpClient) {
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
        return this.http.get<T>(this.api + endPoint, options);
    }

    /**
     * POST request
     * @param endPoint end point of the api
     * @param params body of the request.
     * @param options of the request like headers, body, etc.
     * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Object`.
     */
    public post<T>(endPoint: string, params: Object, options?: IRequestOptions): Observable<T> {
        return this.http.post<T>(this.api + endPoint, params, options);
    }

    /**
     * PUT request
     * @param endPoint end point of the api
     * @param params body of the request.
     * @param options options of the request like headers, body, etc.
     * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Object`.
     */
    public put<T>(endPoint: string, params: Object, options?: IRequestOptions): Observable<T> {
        return this.http.put<T>(this.api + endPoint, params, options);
    }

    /**
     * DELETE request
     * @param endPoint end point of the api
     * @param options options of the request like headers, body, etc.
     * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Object`.
     */
    public delete<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
        return this.http.delete<T>(this.api + endPoint, options);
    }
}
