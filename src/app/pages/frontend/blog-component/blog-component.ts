import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogsService } from '../../../services/blogs-service';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-component',
  imports: [
    CommonModule
  ],
  templateUrl: './blog-component.html',
  styleUrl: './blog-component.scss',
})
export class BlogComponent {

  blogId!: string|null;
  blog!: any;
  safeContent!: SafeHtml;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogsService,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
  ) {}

  async ngOnInit() {
    try {
      const blogId = this.route.snapshot.paramMap.get('id');
      this.blogId = blogId;
      await this.findOneBlog();
      this.cdr.detectChanges()
    } catch (error) {
      
    }
  }

  async findOneBlog() {
    try {
      this.blog = await this.blogService.getOne(String(this.blogId)).toPromise();
      this.safeContent = this.sanitizer.bypassSecurityTrustHtml(this.blog.content);
      console.log("this.blog", this.blog)
    } catch (error) {
      
    }
  }
}
