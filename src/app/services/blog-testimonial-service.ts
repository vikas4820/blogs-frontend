import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogTestimonialService extends ApiService {
  private blogCategoryUrl = '/blog-testimonial';

  constructor(private apiService: ApiService) {
    super(apiService.http);
  }

  create(formData: any): Observable<any> {
    return this.apiService.post(`${this.blogCategoryUrl}`, formData);
  }

  update(id: string|number, formData: any): Observable<any> {
    return this.apiService.put(`${this.blogCategoryUrl}/${id}`, formData);
  }

  findAll(): Observable<any[]> {
    return this.apiService.get<any[]>(this.blogCategoryUrl);
  }

  getCount(): Observable<{ all: number, active: number, inactive: number }> {
    return this.apiService.get<{ all: number, active: number, inactive: number }>(`${this.blogCategoryUrl}/count`);
  }

  getOne(id: string): Observable<any> {
    return this.apiService.get(`${this.blogCategoryUrl}/${id}`);
  }

  deleteCategory(id: number): Observable<any> {
    return this.apiService.delete(`${this.blogCategoryUrl}/${id}`);
  }
  
}
