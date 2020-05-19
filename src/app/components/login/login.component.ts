import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { login } from '../../store/actions/login.actions';

interface Auth {
    email: string;
    password: string;
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    ngForm: FormGroup;
    auth: Auth;
    login$: Observable<any>;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<{ login: string }>
    ) {
        this.auth = {
            email: null,
            password: null,
        };
        this.login$ = store.pipe(select('login'));
    }

    ngOnInit() {
        this.ngForm = this.formBuilder.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required, Validators.minLength(3)]],
        });
    }

    onSubmit() {
        this.auth.email = this.ngForm.controls.email.value;
        this.auth.password = this.ngForm.controls.password.value;

        this.store.dispatch(login(this.auth));
    }
}
