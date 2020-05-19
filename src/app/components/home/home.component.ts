import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { increment, decrement, reset } from '../../store/actions/counter.actions';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    count$: Observable<number>;
    auth$: Observable<any>;

    constructor(private store: Store<{ auth: number }>) {
        this.auth$ = store.pipe(select('auth'));
    }

    ngOnInit() {
    }

    increment() {
        this.store.dispatch(increment({value:9}));
    }

    decrement() {
        this.store.dispatch(decrement());
    }

    reset() {
        this.store.dispatch(reset());
    }
}
