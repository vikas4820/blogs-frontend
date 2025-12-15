import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {
  private authUrl = '/auth';

  constructor(private apiService: ApiService) {
    super(apiService.http); 
  }

  register(userData: any): Observable<any> {
    return this.apiService.post(`${this.authUrl}/register`, userData);
  }

  login(credentials: any): Observable<HttpResponse<any>> {
    return this.apiService.post(`${this.authUrl}/login`, credentials);
  }

  logout(): Observable<any> {
    return this.apiService.post(`${this.authUrl}/logout`, {});
  }

  forgotPassword(email: string): Observable<any> {
    return this.apiService.post(`${this.authUrl}/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.apiService.post(`${this.authUrl}/reset-password`, { token, newPassword });
  }

}
