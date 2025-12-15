import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login-component',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
})
export class LoginComponent {

  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email]
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(6)]
      ]
    });
  }

  async onSubmit() {
    try {
      if (this.loginForm.valid) {
        const response = await this.authService.login(this.loginForm.value).toPromise();
        console.log("response", response);
      } else {
        this.loginForm.markAllAsTouched(); 
      }
    } catch (error) {
      
    }
  }
}
