import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedService } from '../../../services/shared-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-sidebar-component',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './sidebar-component.html',
  styleUrl: './sidebar-component.scss',
})
export class SidebarComponent {

  isSidebarHidden = false;

  constructor(
    private sharedService: SharedService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.sharedService.sidebarVisibility$.subscribe((visible) => {
      this.isSidebarHidden = !visible;
    });
  }

  toggleSidebar() {
    this.sharedService.toggleSidebar();
  }

  logOut() {
    if(!confirm('Are your sure? You have been logged out!')) return;
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
