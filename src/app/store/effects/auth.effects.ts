import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect, Effect } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { auth, authSuccess, authFailure } from '../actions/auth.actions';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthEffects {
    auth$ = createEffect(() =>
        this.actions$.pipe(
            ofType(auth),
            exhaustMap(() =>
                this.authService.show().pipe(
                    map((data) => authSuccess(data)),
                    catchError((error) => of(authFailure({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router
    ) {}

    @Effect({ dispatch: false })
    authSuccess$: Observable<any> = this.actions$.pipe(
        ofType(authSuccess),
        tap((data) => {
            localStorage.setItem('user', JSON.stringify(data.user));
            this.router.navigate(['home']);
        })
    );
}
