import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataService } from './data.service';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';

const PATH = environment.APP_DOMAIN + environment.APP_API_PATH;

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        public httpClient: HttpClient,
        public jwtHelper: JwtHelperService,
        public dataService: DataService
    ) {}

    login(data): Observable<any> {
        return this.httpClient.post(PATH + 'auth/login', data);
    }

    register(data): Observable<any> {
        return this.httpClient.post(PATH + 'auth/register', {
            ...data,
            type_user_id: 1,
        });
    }

    show(): Observable<any> {
        return this.httpClient.get(PATH + 'auth/profile');
    }

    logout(): Observable<any> {
        return throwError(null);
    }

    getTokenExpirationDate() {
        const token = localStorage.getItem('token');
        this.jwtHelper.getTokenExpirationDate(token);
    }

    isTokenExpired() {
        const token = localStorage.getItem('token');
        return this.jwtHelper.isTokenExpired(token);
    }

    decodeToken() {
        const token = localStorage.getItem('token');
        return this.jwtHelper.decodeToken(token);
    }
}
