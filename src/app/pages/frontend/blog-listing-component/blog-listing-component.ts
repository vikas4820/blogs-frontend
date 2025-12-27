import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BlogsService } from '../../../services/blogs-service';
import { LoaderService } from '../../../services/loader-service';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-blog-listing-component',
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './blog-listing-component.html',
  styleUrl: './blog-listing-component.scss',
})
export class BlogListingComponent implements OnInit {

  blogs: any[] = [];
  currentPage = 1;
  totalPages = 0;
  pages: number[] = [];

  constructor(
    private blogService: BlogsService,
    private loader: LoaderService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  async ngOnInit() {
    try {
      this.route.queryParams.subscribe(params => {
        const page = Number(params['page']) || 1;
        this.loadBlogs(page);
      });
      this.cdr.detectChanges();
    } catch (error) {
      
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

  changePage(page: number) {
    console.log("page", page)
    console.log("this.totalPages", this.totalPages)
    if (page < 1 || page > this.totalPages) return;

    console.log("this.totalPages", this.totalPages)
    this.router.navigate([], {
      queryParams: { page },
      queryParamsHandling: 'merge'
    });
  }
}
