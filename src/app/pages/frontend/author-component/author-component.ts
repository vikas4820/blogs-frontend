import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { BlogsService } from '../../../services/blogs-service';
import { LoaderService } from '../../../services/loader-service';
import { firstValueFrom } from 'rxjs';
import { UserState } from '../../../states/user-state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-author-component',
  imports: [
    RouterLink,
    CommonModule,
  ],
  templateUrl: './author-component.html',
  styleUrl: './author-component.scss',
})
export class AuthorComponent {

  blogs: any[] = [];
  currentPage = 1;
  totalPages = 0;
  pages: number[] = [];
  baseBackEndUrl = environment.apiUrl; 

  constructor(
    private blogService: BlogsService,
    private loader: LoaderService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    public userState: UserState,
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
    if (page < 1 || page > this.totalPages) return;
    this.router.navigate([], {
      queryParams: { page },
      queryParamsHandling: 'merge'
    });
  }

  getBlogImage(blog: any) {
    if (blog.images && blog.images.length > 0) {
      return this.baseBackEndUrl + '/uploads/blogs/' + blog.images[0];
    }
    return 'images/default-image.png';
  }

  blogImages(blog: any): string[] {
    if (!blog) return [];
    if (blog.images && blog.images.length > 0) {
      return blog.images.map((img: any) => this.baseBackEndUrl + '/uploads/blogs/' + img);
    }
    return ['images/default-image.png'];
  }

}
