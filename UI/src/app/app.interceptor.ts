import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes('/auth')) {
            return next.handle(req);
        }

        const token = localStorage.getItem('token');
        if (token && token.split('.').length === 3) {
            const modifiedReq = req.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
            return next.handle(modifiedReq);
        }
        return next.handle(req);
    }
}