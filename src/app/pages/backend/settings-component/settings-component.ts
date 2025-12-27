import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BlogSliderService } from '../../../services/blog-slider-service';
import { BlogTestimonialService } from '../../../services/blog-testimonial-service';
import { ToastService } from '../../../services/toast-service';

@Component({
  selector: 'app-settings-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './settings-component.html',
  styleUrl: './settings-component.scss',
})
export class SettingsComponent {
  activeTab: 'slider' | 'testimonial' = 'slider';
  openIndex: number | null = 0;
  settingsForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private blogSliderService: BlogSliderService,
    private blogTestimonialService: BlogTestimonialService,
    private toastService: ToastService,
  ) {
    this.settingsForm = this.fb.group({
      sliders: this.fb.array([this.createSlider()]),
      testimonials: this.fb.array([this.createTestimonial()]),
    });
  }

  createSlider(): FormGroup {
    return this.fb.group({
      id: [null],
      image: [null],
      heading: ['', Validators.required],
      description: [''],
      buttonText: [''],
      buttonUrl: [''],
    });
  }

  createTestimonial(): FormGroup {
    return this.fb.group({
      id: [null],
      name: ['', Validators.required],
      message: [''],
      image: [null],
    });
  }

  get sliders(): FormArray {
    return this.settingsForm.get('sliders') as FormArray;
  }

  get testimonials(): FormArray {
    return this.settingsForm.get('testimonials') as FormArray;
  }

  setTab(tab: 'slider' | 'testimonial') {
    this.activeTab = tab;
    this.openIndex = 0;
  }

  toggleAccordion(index: number) {
    this.openIndex = this.openIndex === index ? null : index;
  }

  addSlider() {
    this.sliders.push(this.createSlider());
    this.openIndex = this.sliders.length - 1;
  }

  addTestimonial() {
    this.testimonials.push(this.createTestimonial());
    this.openIndex = this.testimonials.length - 1;
  }

  onFileChange(event: any, control: AbstractControl, field: string) {
    if (event.target.files?.length) {
      (control as FormGroup).patchValue({
        [field]: event.target.files[0],
      });
    }
  }

  removeSlider(index: number) {
    if (this.sliders.length === 1) return;
    this.sliders.removeAt(index);
  }

  removeTestimonial(index: number) {
    if (this.testimonials.length === 1) return;
    this.testimonials.removeAt(index);
  }

async submitSlider() {
  if (this.sliders.invalid) {
    this.sliders.markAllAsTouched();
    return;
  }

  for (let i = 0; i < this.sliders.length; i++) {
    const fg = this.sliders.at(i) as FormGroup;
    const { id, image, ...rest } = fg.value;

    if (!image) {
      this.toastService.warning('Image is required for each slide');
      return;
    }

    const formData = new FormData();

    Object.keys(rest).forEach(key => {
      if (rest[key] !== null && rest[key] !== undefined) {
        formData.append(key, rest[key]);
      }
    });

    formData.append('image', image);

    if (id) {
      await this.blogSliderService.update(id, formData).toPromise();
    } else {
      const result = await this.blogSliderService.create(formData).toPromise();
      fg.patchValue({ id: result.id });
    }
  }
}


  async submitTestimonial() {
    if (this.testimonials.invalid) {
      this.testimonials.markAllAsTouched();
      return;
    }

    const testimonialValues = this.testimonials.value;
    let result;

    try {
      for (let i = 0; i < testimonialValues.length; i++) {
        const testimonial = testimonialValues[i];

        if (testimonial.id) {
          // UPDATE
          result = await this.blogTestimonialService
            .update(testimonial.id, testimonial)
            .toPromise();
        } else {
          // CREATE
          result = await this.blogTestimonialService.create(testimonial).toPromise();

          // PATCH returned ID back into form
          this.testimonials.at(i).patchValue({ id: result.id });
        }
      }

      console.log('Testimonial saved successfully');
    } catch (error) {
      console.error('Error saving testimonial', error);
    }
  }
}
