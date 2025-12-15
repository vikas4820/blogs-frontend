import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogsCategoryService } from '../../../services/blogs-category-service';

@Component({
  selector: 'app-blogs-category-form-component',
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './blogs-category-form-component.html',
  styleUrl: './blogs-category-form-component.scss',
})
export class BlogsCategoryFormComponent {

  categoryForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private blogsCategoryService: BlogsCategoryService,
  ) {
    this.manageCategoryForm();
  }

  manageCategoryForm() {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required],
      description: [''],
      status: ['active', Validators.required]
    });
  }

  async submitForm() {
    if (this.categoryForm.valid) {
      console.log(this.categoryForm.value);
      const promise = await this.blogsCategoryService.create(this.categoryForm.value).toPromise();
      console.log("promise", promise);
    }
  }
}
