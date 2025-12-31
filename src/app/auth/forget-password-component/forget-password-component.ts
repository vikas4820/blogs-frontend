import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { firstValueFrom } from 'rxjs';
import { ToastService } from './../../services/toast-service';

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

  disabledBtn: boolean = false;
  forgotPasswordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
  ) {}

  ngOnInit() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  async onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.disabledBtn = true;
      const email = this.forgotPasswordForm.value;
      try {
        const result = await firstValueFrom(
          this.authService.forgotPassword(email)
        );

        if(result?.statusCode === 200) {
          this.toastService.success(result?.message || 'Reset password link has been sent. Check you email')
        }
      } catch (error: any) {
        const errorMsg = error?.error?.message || error?.message;
        this.toastService.error(errorMsg);
      } finally {
        this.disabledBtn = false;
        this.forgotPasswordForm.reset();
      }
    } else {
      this.forgotPasswordForm.markAllAsTouched();
    }
  }
}
