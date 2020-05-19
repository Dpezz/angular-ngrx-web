import { createAction, props } from '@ngrx/store';

export const login = createAction(
    '[Login Action] Login',
    props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
    '[Login Effect] Load Login Success',
    props<{ access_token: string }>()
);

export const loginFailure = createAction(
    '[Login Effect] Load Login Failure',
    props<{ error: any }>()
);

export const logout = createAction('[Logout Action] Logout');

export const register = createAction(
    '[Register Action] Register',
    props<{
        name: string;
        email: string;
        password: string;
        confirm_password: string;
    }>()
);

// export const registerSuccess = createAction(
//     '[Register Effect] Load Register Success',
//     props<{ user: string }>()
// );
