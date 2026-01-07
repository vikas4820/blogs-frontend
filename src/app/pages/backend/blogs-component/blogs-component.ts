import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoaderService } from '../../../services/loader-service';
import { BlogsService } from '../../../services/blogs-service';
import { ToastService } from '../../../services/toast-service';
import { firstValueFrom } from 'rxjs';

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
  currentPage = 1;
  totalPages = 0;
  pages: number[] = [];

  constructor(
    private loader: LoaderService,
    private cdr: ChangeDetectorRef,
    private blogService: BlogsService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  async ngOnInit() {
    try {
      this.route.queryParams.subscribe(params => {
        const page = Number(params['page']) || 1;
        this.loadBlogs(page);
      });
      this.cdr.detectChanges();
    } catch (error: any) {
      const errorMsg = error?.error?.message || error?.message;
      this.toastService.error(errorMsg);
    } finally {
      
    }
  }

  async loadBlogs(page = 1) {
    try {
      this.loader.show();
      const blogs = await firstValueFrom(
        this.blogService.findAllWithPagination(page)
      );
      this.blogs = blogs?.data ?? [];
      this.currentPage = blogs.meta.page;
      this.totalPages = blogs.meta.totalPages;
      this.pages = Array.from(
        { length: this.totalPages },
        (_, i) => i + 1
      );
    } catch (error) {
      
    } finally {
      this.loader.hide();
    }
  }

  async deleteBlog(id: number) {

    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      const result = await firstValueFrom(
        this.blogService.deleteBlog(id)
      );
      if(result.success) {
        await this.loadBlogs();
        this.toastService.success("Blog Deleted Successfully");
        this.cdr.detectChanges();
      } else {
        this.toastService.warning('Blog not deleted');
      }
    } catch (error: any) {
      const errorMessage = error?.error?.message || error?.message || 'Something goes wrong';
      this.toastService.warning(errorMessage);
    }
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;

    this.router.navigate([], {
      queryParams: { page },
      queryParamsHandling: 'merge'
    });
  }


  
}
