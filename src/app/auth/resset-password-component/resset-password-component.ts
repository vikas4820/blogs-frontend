import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastService } from '../../services/toast-service';
import { AuthService } from '../../services/auth-service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-resset-password-component',
  imports: [
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './resset-password-component.html',
  styleUrl: './resset-password-component.scss',
})
export class RessetPasswordComponent {

  disabledBtn: boolean = false;
  token!: string|null;
  resetPasswordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastService: ToastService,
  ) {}

  ngOnInit() {

    this.token = this.route.snapshot.queryParamMap.get('token');
    if (!this.token) {
      alert('Invalid or missing reset token');
      return;
    }

    this.resetPasswordForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  // Custom validator to check if password and confirmPassword match
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  async onSubmit() {
    if (this.resetPasswordForm.invalid || !this.token) {
      this.resetPasswordForm.markAllAsTouched();
      return;
    }

    try {
      this.disabledBtn = true;

      // ✅ Correct way to read password
      const password = this.resetPasswordForm.get('password')?.value;

      if (!password) {
        this.toastService.error('Password is required');
        return;
      }

      const result = await firstValueFrom(
        this.authService.resetPassword(this.token, password)
      );

      this.toastService.success('Password reset successfully');

    } catch (error: any) {
      const errorMessage =
        error?.error?.message || error?.message || 'Something went wrong';
      this.toastService.error(errorMessage);
    } finally {
      this.disabledBtn = false;
    }
  }

}
