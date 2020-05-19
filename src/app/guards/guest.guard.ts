import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class GuestGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) {}

    canActivate() {
        if (!this.auth.isTokenExpired()) {
            this.router.navigate(['home']);
            return false;
        } else {
            return true;
        }
    }
}
