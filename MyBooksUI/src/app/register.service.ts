/** Service call for register service */

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {
    private registerUrl: string;

    constructor(
        private http: HttpClient
    ) {
        this.registerUrl = 'http://localhost:9876/signUp';
    }

    register(user: any): Observable<any> {
        return this.http.post<any>(this.registerUrl, user);
    }
}
