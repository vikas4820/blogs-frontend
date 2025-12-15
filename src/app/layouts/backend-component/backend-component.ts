import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/backend/navbar-component/navbar-component';
import { SidebarComponent } from '../../shared/backend/sidebar-component/sidebar-component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-backend-component',
  imports: [
    NavbarComponent,
    SidebarComponent,
    RouterOutlet,
    CommonModule,
  ],
  templateUrl: './backend-component.html',
  styleUrl: './backend-component.scss',
})
export class BackendComponent {

  isCollapsed = false;
  isSidebarOpen = false;

  toggleSidebar() {
    if (window.innerWidth <= 768) {
      this.isSidebarOpen = !this.isSidebarOpen;
    } else {
      this.isCollapsed = !this.isCollapsed;
    }
  }

}
