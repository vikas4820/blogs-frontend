import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogsCategoryService } from '../../../services/blogs-category-service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../../services/loader-service';
import { ToastService } from '../../../services/toast-service';

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
    private loader: LoaderService,
    private router: Router,
    private toastService: ToastService,
  ) {
    this.manageCategoryForm();
  }

  async ngOnInit() {
    try {
      this.loader.show();
      const categoryId = this.route.snapshot.paramMap.get('id');
      this.categoryId = categoryId;

      if(this.categoryId) {
        this.category = await this.blogsCategoryService.getOne(this.categoryId).toPromise();
        this.patch();
      }

    } catch (error) {
      
    } finally {
      this.loader.hide();
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
      let result;
      try {
        if(this.categoryId && this.category) {
          result = await this.blogsCategoryService.update(this.categoryId, this.categoryForm.value).toPromise();
        } else {
          result = await this.blogsCategoryService.create(this.categoryForm.value).toPromise();
        }

        if(result.id) {
          this.category = result;
          this.router.navigate(['/user/blogs-category']);
          // this.patch();
        }
      } catch (error: any) {
        const errorMsg = error?.error?.message || error?.message;
        this.toastService.error(errorMsg);
      } finally {

      }
    }
  }
}
