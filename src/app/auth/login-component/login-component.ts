import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { UserState } from '../../states/user-state.service';
import { ToastService } from '../../services/toast-service';
import { firstValueFrom } from 'rxjs';

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
  disabledBtn: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private userState: UserState,
    private toastService: ToastService,
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
    if (this.loginForm.valid) {
      try {
        this.disabledBtn= true;
        const response = await firstValueFrom(
          this.authService.login(this.loginForm.value)
        );
        if(response && response.access_token) {
          localStorage.setItem('access_token', response.access_token);
          this.authService.initializeFromToken();
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/author';
          this.router.navigateByUrl(returnUrl);
          this.toastService.success("YOU HAVE LOGGED IN");
        }
      } catch (error: any) {
        const errorMessage = error?.error?.message || error?.message;
        this.toastService.error(errorMessage);
      } finally {
        this.disabledBtn = false;
      }
    } else {
      this.loginForm.markAllAsTouched(); 
    }
  }
}
