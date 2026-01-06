import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogsCategoryService } from '../../../services/blogs-category-service';
import { LoaderService } from '../../../services/loader-service';
import { BlogsService } from '../../../services/blogs-service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserState } from '../../../states/user-state.service';
import { QuillModule } from 'ngx-quill';
import { firstValueFrom } from 'rxjs';
import { ToastService } from '../../../services/toast-service';

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
  titleWordError = false;
  MAX_WORDS = 10;

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
    public userState: UserState,
    private toastService: ToastService,
    private router: Router,
  ) {
    this.manageBlogForm();
  }

  manageBlogForm() {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      slug: [{ value: '', disabled: true }],
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
        this.blog = await firstValueFrom(
          this.blogService.getOne(this.blogId)
        );
        this.patch();
      }
    } catch (error: any) {
      const errorMsg = error?.error?.message || error?.message;
      this.toastService.error(errorMsg);
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
      const categories = await firstValueFrom(
        this.blogsCategoryService.findAll()
      );
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
      if (this.blogForm.valid) {

        const rawFormValue = this.blogForm.getRawValue(); // IMPORTANT

        const formValue = {
          ...rawFormValue,
          blogCategory: Number(rawFormValue.blogCategory),
          user: Number(this.userState.user()?.sub),
        };

        let result;

        if (this.blogId && this.blog) {
          // UPDATE CASE
          result = await firstValueFrom(
            this.blogService.update(Number(this.blogId), formValue)
          );
        } else {
          // CREATE CASE
          result = await firstValueFrom(
            this.blogService.create(formValue)
          );
        }

        if (result?.id) {
          this.blog = result;
          this.router.navigate(['/user/blogs']);
        }
      }
    } catch (error: any) {
      const errorMsg = error?.error?.message || error?.message;
      this.toastService.error(errorMsg);
    }
  }

  onTitleChange() {
    const titleControl = this.blogForm.get('title');
    const slugControl = this.blogForm.get('slug');

    if (!titleControl || !slugControl) return;

    let title = titleControl.value || '';

    // Normalize spaces
    title = title.trim().replace(/\s+/g, ' ');

    const words = title.split(' ');

    // Enforce word limit
    if (words.length > this.MAX_WORDS) {
      title = words.slice(0, this.MAX_WORDS).join(' ');
      titleControl.setValue(title, { emitEvent: false });
      this.titleWordError = true;
    } else {
      this.titleWordError = false;
    }

    // Generate slug
    const slug = this.generateSlug(title);
    slugControl.setValue(slug);
  }

  generateSlug(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '') // remove special chars
      .replace(/\s+/g, '-')        // spaces → hyphen
      .replace(/-+/g, '-');        // remove multiple hyphens
  }
  
}
