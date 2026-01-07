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
import { environment } from '../../../../environments/environment';

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
  selectedImages: File[] = [];
  existingImages: string[] = []; // from backend
  imagePreviews: string[] = [];  // preview URLs
  removedImages: string[] = [];  // images user removed
  MAX_WORDS = 10;
  MAX_IMAGES = 3;

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
  
    this.existingImages = [...(this.blog.images || [])];
    
    const url = environment.apiUrl; 
    this.imagePreviews = this.existingImages.map(
      img => `${url}/uploads/blogs/${img}`
    );
  
    this.blogForm.patchValue({
      title: this.blog.title,
      slug: this.blog.slug,
      blogCategory: this.blog.blogCategory ? this.blog.blogCategory.id : null,
      shortDescription: this.blog.shortDescription,
      content: this.blog.content,
      metaTitle: this.blog.metaTitle ?? '',
      metaDescription: this.blog.metaDescription ?? '',
      status: this.blog.status || 'active',
      user: this.blog.user.id || null
    });
  
    this.imageError = this.imagePreviews.length === 0;
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

  async submitForm() {
    try {
      if (this.blogForm.valid && !this.imageError) {
  
        const rawFormValue = this.blogForm.getRawValue();
  
        const formData = new FormData();
  
        formData.append('title', rawFormValue.title);
        formData.append('slug', rawFormValue.slug);
        formData.append('blogCategory', rawFormValue.blogCategory);
        formData.append('shortDescription', rawFormValue.shortDescription);
        formData.append('content', rawFormValue.content);
        formData.append('metaTitle', rawFormValue.metaTitle || '');
        formData.append('metaDescription', rawFormValue.metaDescription || '');
        formData.append('status', rawFormValue.status);
        formData.append('user', String(this.userState.user()?.sub));
  
        this.selectedImages.forEach((file) => {
          formData.append('images', file);
        });
        
        this.removedImages.forEach(img => {
          formData.append('removedImages[]', img);
        });
  
        let result;
  
        if (this.blogId) {
          result = await firstValueFrom(
            this.blogService.update(Number(this.blogId), formData)
          );
        } else {
          result = await firstValueFrom(
            this.blogService.create(formData)
          );
        }
  
        if (result?.id) {
          this.router.navigate(['/user/blogs']);
        }

        const message = this.blogId ? 'Blog updated Successfully' : 'Blog created Successfully';
        this.toastService.success(message);
      }
    } catch (error: any) {
      this.toastService.error(error?.error?.message || error?.message);
    }
  }
  
  /*
  async submitForm() {
    try {
      if (this.blogForm.valid) {

        const rawFormValue = this.blogForm.getRawValue(); 

        const formValue = {
          ...rawFormValue,
          blogCategory: Number(rawFormValue.blogCategory),
          user: Number(this.userState.user()?.sub),
        };

        let result;

        if (this.blogId && this.blog) {
          result = await firstValueFrom(
            this.blogService.update(Number(this.blogId), formValue)
          );
        } else {
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
  */

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

  onFileChange(event: any) {
    const files: FileList = event.target.files;
    if (!files) return;
  
    const totalImages =
      this.existingImages.length + files.length;
  
    if (totalImages > this.MAX_IMAGES) {
      this.toastService.error('Maximum 3 images allowed');
      return;
    }
  
    Array.from(files).forEach(file => {
      this.selectedImages.push(file);
  
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviews.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  
    this.imageError = false;
  }

  removeImage(index: number) {
    const removed = this.existingImages[index];
  
    if (removed) {
      this.removedImages.push(removed);
      this.existingImages.splice(index, 1);
    }
  
    this.imagePreviews.splice(index, 1);
    this.selectedImages.splice(index, 1);
  
    this.imageError = this.imagePreviews.length === 0;
  }
  
  
}
