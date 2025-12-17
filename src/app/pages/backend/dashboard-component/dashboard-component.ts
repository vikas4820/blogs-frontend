import { RouterLink } from '@angular/router';
import { BlogsCategoryService } from '../../../services/blogs-category-service';
import { UsersService } from '../../../services/users-service';
import { BlogsService } from './../../../services/blogs-service';
import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-component',
  imports: [
    RouterLink,
  ],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.scss',
})
export class DashboardComponent {

  usersCount: number = 0;
  blogsCount: number = 0;
  blogsCategoryCount: number = 0;

  constructor(
    private cdr: ChangeDetectorRef,
    private blogsService: BlogsService,
    private usersService: UsersService,
    private blogsCategoryService: BlogsCategoryService,
  ) {}

  async ngOnInit() {
    try {
      const blogsRes = await this.blogsService.getCount().toPromise();
      this.blogsCount = blogsRes?.all || 0;
      const usersRes = await this.usersService.getCount().toPromise();
      this.usersCount = usersRes?.all || 0;
      const blogsCategoryRes = await this.blogsCategoryService.getCount().toPromise();
      this.blogsCategoryCount = blogsCategoryRes?.all || 0;

      this.cdr.detectChanges();
    } catch (error) {
      
    }
  }
}
