import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControl,
    ValidationErrors,
} from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { register } from '../../store/actions/login.actions';

interface Register {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
}

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
    ngForm: FormGroup;
    auth: Register;
    login$: Observable<any>;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<{ login: string }>
    ) {
        this.auth = {
            name: null,
            email: null,
            password: null,
            confirm_password: null,
        };
    }

    ngOnInit() {
        this.ngForm = this.formBuilder.group({
            name: [null, [Validators.required]],
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required, Validators.minLength(3)]],
            confirm_password: [
                null,
                [Validators.required, Validators.minLength(3)],
            ],
        });
    }

    onSubmit() {
        this.auth.name = this.ngForm.controls.name.value;
        this.auth.email = this.ngForm.controls.email.value;
        this.auth.password = this.ngForm.controls.password.value;
        this.auth.confirm_password = this.ngForm.controls.confirm_password.value;

        this.store.dispatch(register(this.auth));
    }
}
