import { createAction, props } from '@ngrx/store';

export const auth = createAction('[AUTH Action] Load');

export const authSuccess = createAction(
    '[Auth Effect] Load Auth Success',
    props<{ user: any }>()
);

export const authFailure = createAction(
    '[Auth Effect] Load Auth Failure',
    props<{ error: any }>()
);
