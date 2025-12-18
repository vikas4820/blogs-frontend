import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogsCategoryService } from '../../../services/blogs-category-service';
import { LoaderService } from '../../../services/loader-service';
import { BlogsService } from '../../../services/blogs-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blogs-form-component',
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './blogs-form-component.html',
  styleUrl: './blogs-form-component.scss',
})
export class BlogsFormComponent {

  blogForm!: FormGroup;
  imageError = true;
  categories: any[] = [];
  blogId!: string|null;
  blog!: any;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogsService,
    private blogsCategoryService: BlogsCategoryService,
    private loader: LoaderService,
    private route: ActivatedRoute,
  ) {
    this.manageBlogForm();
  }

  manageBlogForm() {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      slug: ['', Validators.required],
      categoryId: ['', Validators.required],
      shortDescription: ['', Validators.required],
      content: ['', Validators.required],
      metaTitle: [''],
      metaDescription: [''],
      status: ['active', Validators.required],
    });
  }

  async ngOnInit() {
    try {
      this.loader.show();
      await this.fetchCategories();
      const blogId = this.route.snapshot.paramMap.get('id');
      this.blogId = blogId;

      if(this.blogId) {
        this.blog = await this.blogService.getOne(this.blogId).toPromise();
        this.patch();
      }
    } catch (error) {
      
    } finally {
      this.loader.hide();
    }
  }

  patch() {
    if (!this.blog) return;

    this.blogForm.patchValue({
      title: this.blog.title,
      slug: this.blog.slug,
      categoryId: this.blog.categoryId, 
      shortDescription: this.blog.shortDescription,
      content: this.blog.content,
      metaTitle: this.blog.metaTitle ?? '',
      metaDescription: this.blog.metaDescription ?? '',
      status: this.blog.status || 'active',
    });
  }


  async fetchCategories() {
    try {
      const categories = await this.blogsCategoryService
        .findAll()
        .toPromise();

      this.categories = categories ?? [];
    } catch (error) {
      console.log(error)
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.imageError = !file;
  }

  async submitForm() {
    try {
      if(this.blogForm.valid) {

        const formValue = {
          ...this.blogForm.value,
          categoryId: Number(this.blogForm.value.categoryId),
        };
        let result;
        if(this.blogId && this.blog) {
          // result = await this.blogService.update(this.blogId, this.blogForm.value).toPromise();
        } else {
          result = await this.blogService.create(formValue).toPromise();
        }

        console.log("result", result);

        if(result.id) {
          this.blog = result;
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      
    }
  }
}
