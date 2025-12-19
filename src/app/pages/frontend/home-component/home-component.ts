import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoaderService } from '../../../services/loader-service';
import { BlogsService } from '../../../services/blogs-service';

@Component({
  selector: 'app-home-component',
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent {

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

}
