import {inject} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.services";

export const AuthGuard = (): boolean => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (!auth.isLoggedIn()) {
        router.navigateByUrl('/login');
        return false;
    }
    return true;
}
