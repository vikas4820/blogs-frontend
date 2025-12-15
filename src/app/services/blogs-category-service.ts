import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { Observable } from 'rxjs/internal/Observable';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BlogsCategoryService extends ApiService {
  private authUrl = '/blog-category';

  constructor(private apiService: ApiService) {
    super(apiService.http); 
  }

  create(formData: any): Observable<HttpResponse<any>> {
    return this.apiService.post(`${this.authUrl}`, formData);
  }

  findAll(): Observable<HttpResponse<any>> {
    return this.apiService.get(`${this.authUrl}`);
  }

}
