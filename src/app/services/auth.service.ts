import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  loginAdmin(data: { email: string; password: string }) {
    return this.http.post<any>('/api/admin/login', data);
  }

  signupAdmin(data: { email: string; password: string }) {
    return this.http.post<any>('/api/admin/signup', data);
  }

  logout() {
    localStorage.removeItem('admin-token');
    this.router.navigate(['/admin-login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('admin-token');
  }
}
