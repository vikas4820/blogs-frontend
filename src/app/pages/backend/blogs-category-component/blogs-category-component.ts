import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BlogsCategoryService } from '../../../services/blogs-category-service';
import { LoaderService } from '../../../services/loader-service';

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
    private cdr: ChangeDetectorRef,
    private loader: LoaderService,
  ) {}

  async ngOnInit() {
    try {
      this.loader.show();
      await this.loadCategories();
      this.cdr.detectChanges();
      console.log(this.blogCategories);
    } catch (error) {
      console.error('Error fetching blog categories:', error);
    } finally {
      this.loader.hide();
    }
  }

  async loadCategories() {
    try {
      const categories = await this.blogsCategoryService.findAll().toPromise();
      this.blogCategories = categories ?? [];
    } catch (error) {
      
    }
  }

  async deleteCategory(id: number) {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      const result = await this.blogsCategoryService.deleteCategory(id).toPromise();
      if(result.status) {
        console.log("DELETED");
        await this.loadCategories();
        this.cdr.detectChanges();
      } else {
        console.log("NOT DELETED");
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  }

  
}
