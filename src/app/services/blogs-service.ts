import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class BlogsService extends ApiService {
  private authUrl = '/blog';

  constructor(private apiService: ApiService) {
    super(apiService.http); 
  }

  create(formData: any): Observable<any> {
    return this.apiService.post(`${this.authUrl}`, formData);
  }
  
}
