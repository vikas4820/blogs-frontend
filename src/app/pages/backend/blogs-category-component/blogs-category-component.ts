import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BlogsCategoryService } from '../../../services/blogs-category-service';

@Component({
  selector: 'app-blogs-category-component',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './blogs-category-component.html',
  styleUrl: './blogs-category-component.scss',
})
export class BlogsCategoryComponent {

  blogCategories: any[] = [];

  constructor(
    private blogsCategoryService: BlogsCategoryService,
  ) {}

  async ngOnInit() {
    try {
      const categories = await this.blogsCategoryService.findAll().toPromise();
      console.log(categories)
      // this.blogCategories = categories;
    } catch (error) {
      console.error('Error fetching blog categories:', error);
    }
  }
  
}
