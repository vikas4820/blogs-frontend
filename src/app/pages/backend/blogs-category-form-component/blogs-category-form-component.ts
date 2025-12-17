import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogsCategoryService } from '../../../services/blogs-category-service';
import { ActivatedRoute } from '@angular/router';

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
  categoryId!: string|null;
  category!: any;

  constructor(
    private fb: FormBuilder,
    private blogsCategoryService: BlogsCategoryService,
    private route: ActivatedRoute,
  ) {
    this.manageCategoryForm();
  }

  async ngOnInit() {
    try {
      const categoryId = this.route.snapshot.paramMap.get('id');
      this.categoryId = categoryId;

      if(this.categoryId) {
        this.category = await this.blogsCategoryService.getOne(this.categoryId).toPromise();
        this.patch();
      }

    } catch (error) {
      
    }
  }

  patch() {
    this.categoryForm.patchValue({
      categoryName: this.category.categoryName,
      description: this.category.description,
      status: this.category.status || 'active', 
    });
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
      let result;
      if(this.categoryId && this.category) {
        result = await this.blogsCategoryService.update(this.categoryId, this.categoryForm.value).toPromise();
      } else {
        result = await this.blogsCategoryService.create(this.categoryForm.value).toPromise();
      }

      if(result.id) {
        this.category = result;
        this.patch();
      }
    }
  }
}
