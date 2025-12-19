import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogsCategoryService } from '../../../services/blogs-category-service';
import { LoaderService } from '../../../services/loader-service';
import { BlogsService } from '../../../services/blogs-service';
import { ActivatedRoute } from '@angular/router';
import { UserState } from '../../../states/user-state.service';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-blogs-form-component',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    QuillModule
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

  // editorModules = {
  //   toolbar: [
  //     ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  //     [{ 'header': [1, 2, 3, 4, 5, 6, false] }],      // headers
  //     [{ 'list': 'ordered' }, { 'list': 'bullet' }],  // lists
  //     [{ 'script': 'sub' }, { 'script': 'super' }],   // sub/superscript
  //     [{ 'indent': '-1' }, { 'indent': '+1' }],       // indent
  //     [{ 'direction': 'rtl' }],                       // text direction
  //     [{ 'size': ['small', false, 'large', 'huge'] }],// font size
  //     [{ 'color': [] }, { 'background': [] }],        // color
  //     [{ 'align': [] }],                              // text align
  //     ['link', 'image', 'code-block', 'blockquote', 'formula', 'clean'] // links, images, code, quote, formula, remove
  //   ]
  // };

  constructor(
    private fb: FormBuilder,
    private blogService: BlogsService,
    private blogsCategoryService: BlogsCategoryService,
    private loader: LoaderService,
    private route: ActivatedRoute,
    public userState: UserState
  ) {
    this.manageBlogForm();
  }

  manageBlogForm() {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      slug: ['', Validators.required],
      blogCategory: ['', Validators.required],
      shortDescription: ['', Validators.required],
      content: ['', Validators.required],
      metaTitle: [''],
      metaDescription: [''],
      status: ['active', Validators.required],
      user: [''],
    });
  }

  async ngOnInit() {
    try {
      console.log(this.userState.user()?.sub);
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
      blogCategory: this.blog.categoryId, 
      shortDescription: this.blog.shortDescription,
      content: this.blog.content,
      metaTitle: this.blog.metaTitle ?? '',
      metaDescription: this.blog.metaDescription ?? '',
      status: this.blog.status || 'active',
      user: this.blog.user.id || null
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
          blogCategory: Number(this.blogForm.value.blogCategory),
          user: Number(this.userState.user()?.sub)
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
