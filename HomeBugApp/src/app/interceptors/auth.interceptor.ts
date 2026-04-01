import { HttpInterceptorFn } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { inject } from "@angular/core";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const token = authService.getToken()

    if(req.url.includes('/auth/login') || req.url.includes('/auth/reqgister')) {
        return next(req);
    }

    if(token){
        const clonedRequest = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        return next(clonedRequest)
    }

    return next(req)
}