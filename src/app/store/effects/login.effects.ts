import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, ofType, createEffect, Effect } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import {
    login,
    loginSuccess,
    logout,
    register,
} from '../actions/login.actions';
import { auth, authFailure, authSuccess } from '../actions/auth.actions';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class LoginEffects {
    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(login),
            exhaustMap((action) =>
                this.authService
                    .login({ email: action.email, password: action.password })
                    .pipe(
                        map((data) => loginSuccess(data)),
                        catchError((error) => of(authFailure({ error })))
                    )
            )
        )
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(logout),
            exhaustMap(() => this.authService.logout())
        )
    );

    register$ = createEffect(() =>
        this.actions$.pipe(
            ofType(register),
            exhaustMap((action) =>
                this.authService
                    .register({
                        name: action.name,
                        email: action.email,
                        password: action.password,
                        confirm_password: action.confirm_password,
                    })
                    .pipe(
                        map((data) => loginSuccess(data )),
                        catchError((error) => of(authFailure({ error })))
                    )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private router: Router,
        private authService: AuthService
    ) {}

    @Effect({ dispatch: false })
    loginSuccess$: Observable<any> = this.actions$.pipe(
        ofType(loginSuccess),
        tap((data) => {
            localStorage.setItem('token', data.access_token);
            this.store.dispatch(auth());
        })
    );

    @Effect({ dispatch: false })
    logoutSuccess$: Observable<any> = this.actions$.pipe(
        ofType(logout),
        tap(() => {
            localStorage.clear();
            this.router.navigate(['login']);
            console.log('close session - ' + Date());
        })
    );
}
