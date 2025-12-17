import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-component',
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.scss',
})
export class NavbarComponent {

  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService
  ) {}

  async ngOnInit() {
    try {
      this.isLoggedIn = this.authService.isLoggedIn();
    } catch (error) {
      
    }
  }
}
