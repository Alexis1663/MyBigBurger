import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private readonly _cookieService: CookieService) {}

    login(email: string, password: string): boolean {
        if (email && password) {
            this._cookieService.set('isAdmin', 'true');
            return true;
        }
        return false;
    }

    isLoggedIn(): boolean {
        return (
            this._cookieService.check('isAdmin')
        );
    }

    logout(): void {
        this._cookieService.delete('isAdmin');
    }
}
