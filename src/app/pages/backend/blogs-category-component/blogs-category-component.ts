import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BlogsCategoryService } from '../../../services/blogs-category-service';
import { LoaderService } from '../../../services/loader-service';
import { ToastService } from '../../../services/toast-service';
import { firstValueFrom } from 'rxjs';

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
  currentPage = 1;
  totalPages = 0;
  pages: number[] = [];

  constructor(
    private blogsCategoryService: BlogsCategoryService,
    private cdr: ChangeDetectorRef,
    private loader: LoaderService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  async ngOnInit() {
    try {
      this.loader.show();
      this.route.queryParams.subscribe(params => {
        const page = Number(params['page']) || 1;
        this.loadCategories(page);
      });
      this.cdr.detectChanges();
    } catch (error: any) {
      const errorMessage = error?.error?.message || error?.message || 'Something goes wrong';
      this.toastService.warning(errorMessage);
    } finally {
      this.loader.hide();
    }
  }

  async loadCategories(page: number = 1, limit: number = 5) {
    try {
      this.loader.show();
      const categories: any = await firstValueFrom(
        this.blogsCategoryService.findAllWithPagination(page, limit)
      );
  
      // Check if response has meta (paginated) or just array
      if (Array.isArray(categories)) {
        this.blogCategories = categories;
        this.currentPage = 1;
        this.totalPages = 1;
        this.pages = [1];
      } else {
        this.blogCategories = categories.data ?? [];
        this.currentPage = categories.meta?.page ?? 1;
        this.totalPages = categories.meta?.totalPages ?? 1;
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      }
    } catch (error: any) {
      const errorMessage = error?.error?.message || error?.message || 'Something went wrong';
      this.toastService.warning(errorMessage);
    } finally {
      this.loader.hide();
      this.cdr.detectChanges();
    }
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;

    this.router.navigate([], {
      queryParams: { page },
      queryParamsHandling: 'merge'
    });
  }
  

  async deleteCategory(id: number) {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      const result = await firstValueFrom(
        this.blogsCategoryService.deleteCategory(id)
      );
      if(result.status) {
        await this.loadCategories();
        this.toastService.success("Category Deleted Successfully");
        this.cdr.detectChanges();
      } else {
        this.toastService.warning('Category not deleted');
      }
    } catch (error: any) {
      const errorMessage = error?.error?.message || error?.message || 'Something goes wrong';
      this.toastService.warning(errorMessage);
    }
  }

  
}
