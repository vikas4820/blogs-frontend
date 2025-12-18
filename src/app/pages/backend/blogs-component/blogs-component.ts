import { Component, ChangeDetectorRef } from '@angular/core';
import { BlogsCategoryService } from '../../../services/blogs-category-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoaderService } from '../../../services/loader-service';
import { BlogsService } from '../../../services/blogs-service';

@Component({
  selector: 'app-blogs-component',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './blogs-component.html',
  styleUrl: './blogs-component.scss',
})
export class BlogsComponent {

  blogs: any[] = [];

  constructor(
    private loader: LoaderService,
    private cdr: ChangeDetectorRef,
    private blogService: BlogsService,
  ) {}

  async ngOnInit() {
    try {
      this.loader.show();
      await this.loadBlogs();
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error fetching blog categories:', error);
    } finally {
      this.loader.hide();
    }
  }

  async loadBlogs() {
    try {
      const blogs = await this.blogService.findAll().toPromise();
      this.blogs = blogs ?? [];
      console.log("this.blogs", this.blogs)
    } catch (error) {
      
    }
  }

  async deleteBlog(id: number) {
    try {
      
    } catch (error) {
      
    }
  }
  
}
