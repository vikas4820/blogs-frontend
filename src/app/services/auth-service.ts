import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {
  private authUrl = '/auth';
  private jwtHelper = new JwtHelperService();

  constructor(
    private apiService: ApiService,
  ) {
    super(apiService.http); 
  }

  register(userData: any): Observable<any> {
    return this.apiService.post(`${this.authUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.apiService.post(`${this.authUrl}/login`, credentials);
  }

  forgotPassword(email: string): Observable<any> {
    return this.apiService.post(`${this.authUrl}/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.apiService.post(`${this.authUrl}/reset-password`, { token, newPassword });
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    return !this.jwtHelper.isTokenExpired(token);
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const decoded = this.decodeToken(token);
    return decoded?.role ?? null;
  }

  decodeToken(token: string) {
    return this.jwtHelper.decodeToken(token);
  }

  isTokenExpired(token: string): boolean {
    return this.jwtHelper.isTokenExpired(token);
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

}
