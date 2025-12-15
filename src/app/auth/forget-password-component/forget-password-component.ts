import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forget-password-component',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './forget-password-component.html',
  styleUrl: './forget-password-component.scss',
})
export class ForgetPasswordComponent {
  forgotPasswordForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      console.log(this.forgotPasswordForm.value);
    } else {
      this.forgotPasswordForm.markAllAsTouched();
    }
  }
}
