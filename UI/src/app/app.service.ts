import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class AppService {
    private baseUrl = "http://localhost:8080/";

    constructor(private http: HttpClient) { }

    // Peer to Peer data
    private message = new BehaviorSubject("");
    getMessage = this.message.asObservable();

    private isCollapsed = new BehaviorSubject<boolean>(false);
    isCollapsed$ = this.isCollapsed.asObservable();

    setMessage(message: string) {
        this.message.next(message);
    }

    toggleSidebar() {
        this.isCollapsed.next(!this.isCollapsed.value);
    }

    setCollapsed(state: boolean) {
        this.isCollapsed.next(state);
    }

    // Auth
    isAuthenticated(): boolean {
        const token = sessionStorage.getItem('token');
        return token !== null && token !== '';
    }

    login(data: any) {
        const url = this.baseUrl + "auth/login";
        return this.http.post(url, data);
    }

    register(data: any) {
        const url = this.baseUrl + "auth/register";
        return this.http.post(url, data, { responseType: 'text' });
    }

    verify(email: string) {
        const url = this.baseUrl + "auth/verify";
        return this.http.post(url, email);
    }

    getUser(email: string) {
        const url = this.baseUrl + "auth/user/" + email;
        return this.http.get(url);
    }

    // User
    updatePassword(data: any) {
        const url = this.baseUrl + "auth/change-password";
        return this.http.put(url, data, { responseType: 'text' });
    }
}