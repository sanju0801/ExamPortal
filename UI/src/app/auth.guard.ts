import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppService } from './app.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private appService: AppService, private router: Router) { }

    canActivate(): boolean {
        if (this.appService.isAuthenticated()) {
            return true;
        } else {
            this.router.navigate(['/auth/login']);
            return false;
        }
    }
}