import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class BlogsService extends ApiService {
  private blogUrl = '/blog';

  constructor(private apiService: ApiService) {
    super(apiService.http); 
  }

  findAll(): Observable<any[]> {
    return this.apiService.get<any[]>(this.blogUrl);
  }

  getCount(): Observable<{ all: number, active: number, inactive: number }> {
    return this.apiService.get<{ all: number, active: number, inactive: number }>(`${this.blogUrl}/count`);
  }

  getOne(id: string): Observable<any> {
    return this.apiService.get(`${this.blogUrl}/${id}`);
  }

  create(formData: any): Observable<any> {
    return this.apiService.post(`${this.blogUrl}`, formData);
  }
  
}
