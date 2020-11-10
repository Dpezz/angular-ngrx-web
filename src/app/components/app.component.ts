import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { logout } from '../store/actions/login.actions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { authSuccess } from '../store/actions/auth.actions';

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
        const user_storage = localStorage.getItem('user');
        console.log(user_storage);
        this.store.dispatch(authSuccess({user:JSON.parse(user_storage)}));
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
