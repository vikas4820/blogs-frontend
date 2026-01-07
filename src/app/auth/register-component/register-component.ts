import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { firstValueFrom } from 'rxjs';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'app-register-component',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register-component.html',
  styleUrl: './register-component.scss',
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      const formData = { ...this.registerForm.value }; 
      delete formData.confirmPassword;

      try {
        const response = await firstValueFrom(
          this.authService.register(formData)
        );

        if(response.id) {
          this.toastService.success('Congratulations! You have beacuse an author');
        }
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/author';
        this.router.navigateByUrl(returnUrl);
      } catch (error: any) {
        const errorMessage = error?.error?.message || error?.message || 'Something goes wrong';
        this.toastService.error(errorMessage);
      }
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
