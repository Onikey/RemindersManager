import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


export abstract class BaseAppDataService {
    protected baseApi = environment.baseApi;

    constructor(protected http: HttpClient) { }
}
