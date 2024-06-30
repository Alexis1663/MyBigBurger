import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private readonly _cookieService: CookieService,
        private readonly _router: Router
    ) {}

    public login(email: string, password: string): boolean {
        if (email && password) {
            this._cookieService.set('isAdmin', 'true');
            return true;
        }
        return false;
    }

    public isLoggedIn(): boolean {
        return (
            this._cookieService.check('isAdmin')
        );
    }

    public logout(): void {
        this._cookieService.delete('isAdmin');
        this._router.navigate(['/home']);
    }
}
