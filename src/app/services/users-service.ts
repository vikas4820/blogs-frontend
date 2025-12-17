import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends ApiService {
  private userUrl = '/user';

  constructor(private apiService: ApiService) {
    super(apiService.http); 
  }

  
  findAll(): Observable<any[]> {
    return this.apiService.get<any[]>(this.userUrl);
  }

  getCount(): Observable<{ all: number, active: number, inactive: number }> {
    return this.apiService.get<{ all: number, active: number, inactive: number }>(`${this.userUrl}/count`);
  }

  create(formData: any): Observable<any> {
    return this.apiService.post(`${this.userUrl}`, formData);
  }
}
