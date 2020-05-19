import { createReducer, on } from '@ngrx/store';
import { authSuccess, authFailure } from '../actions/auth.actions';
import { logout } from '../actions/login.actions';

export const initialState = {
    isAuth: false,
    user: null,
    error: null,
};

const _authReducer = createReducer(
    initialState,
    on(authSuccess, (state, action) => ({
        error: null,
        isAuth: action.user ? true : false,
        user: action.user,
    })),
    on(authFailure, (state, action) => ({ error: action.error })),
    on(logout, (state, action) => ({
        error: null,
        isAuth: false,
        user: null,
    }))
);

export function authReducer(state, action) {
    return _authReducer(state, action);
}
