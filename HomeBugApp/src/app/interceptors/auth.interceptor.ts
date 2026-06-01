import { HttpInterceptorFn } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { Router } from "@angular/router";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const token = authService.getToken()

    if (req.url.includes('/auth/login') || req.url.includes('/auth/register')) {
        return next(req);
    }

    if (token) {
        const clonedRequest = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        return next(clonedRequest)
    }

    return next(req).pipe(
        catchError(error => {
            if (error.status === 401) {
                authService.logout();
                router.navigate(['/login'])
            }
            return throwError(() => error)
        })
    )
}