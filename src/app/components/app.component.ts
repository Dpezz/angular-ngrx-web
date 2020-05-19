import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { logout } from '../store/actions/login.actions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface AppState {
    user: Object;
    isAuth: boolean;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    auth$: Observable<AppState>;
    isAuth: boolean;
    user: any = { name: 'null' };

    constructor(private store: Store, private store$: Store<{ auth: any }>) {
        this.auth$ = this.store$.pipe(select('auth'));
    }

    ngOnInit() {
        this.auth$
            .pipe(
                map((x) => {
                    this.isAuth = x.isAuth;
                    this.user = x.user;
                })
            )
            .subscribe();
    }

    logout() {
        this.store.dispatch(logout());
    }
}
