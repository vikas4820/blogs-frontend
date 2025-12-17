import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogsCategoryService } from '../../../services/blogs-category-service';

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

  constructor(
    private fb: FormBuilder,
    private blogsCategoryService: BlogsCategoryService,
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
      await this.fetchCategories();
    } catch (error) {
      
    }
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
        console.log(this.blogForm.value);
      }
    } catch (error) {
      console.log(error)
    }
  }
}
