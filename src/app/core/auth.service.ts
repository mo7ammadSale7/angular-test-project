import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment as env } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = new BehaviorSubject<boolean>(
    !!localStorage.getItem('AuthToken')
  );

  constructor(private http: HttpClient, private router: Router) {}

  login(user: object) {
    return this.http.post(`${env.apiRoot}user/login`, user);
  }

  signUp(user: object) {
    return this.http.post(`${env.apiRoot}user/register`, user);
  }

  saveUserData(token: any) {
    localStorage.setItem('AuthToken', token.token);
    this.router.navigate(['/']);
  }

  logout() {
    localStorage.removeItem('AuthToken');
    this.router.navigate(['/login']);
  }
}
