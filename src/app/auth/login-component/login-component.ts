import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      usernameOrEmail: [
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
        console.log(response)
        if(response && response.access_token) {
          localStorage.setItem('access_token', response.access_token);
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/author';
          this.router.navigateByUrl(returnUrl);
          console.log("response", response);
        }
      } else {
        this.loginForm.markAllAsTouched(); 
      }
    } catch (error) {
      
    }
  }
}
