import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    private pathUrl: string = '';

    constructor(
        public httpClient: HttpClient,
        public jwtHelper: JwtHelperService
    ) {
        this.pathUrl = environment.APP_DOMAIN + environment.APP_API_PATH;
    }

    ngOnInit() {
        console.log(this.jwtHelper.isTokenExpired());
    }

    all(url: string): Promise<any> {
        const path = this.pathUrl + url;
        return this.httpClient
            .get(path)
            .toPromise()
            .then((response) => response)
            .catch(this.handleError);
    }

    get(url: string, id: number): Promise<any> {
        const path = this.pathUrl + url + '/' + id;
        return this.httpClient
            .get(path)
            .toPromise()
            .then((response) => response)
            .catch(this.handleError);
    }

    delete(url: string, id: number): Promise<void> {
        const path = this.pathUrl + url + '/' + id;
        return this.httpClient
            .delete(path)
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    post(url: string, request: object): Promise<any> {
        const path = this.pathUrl + url;
        return this.httpClient
            .post(path, request)
            .toPromise()
            .then((res) => res)
            .catch(this.handleError);
    }

    put(url: string, request: object): Promise<any> {
        const path = this.pathUrl + url + '/';
        const id = request['id'] ? request['id'] : '';
        return this.httpClient
            .put(path + id, request)
            .toPromise()
            .then((res) => res)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
