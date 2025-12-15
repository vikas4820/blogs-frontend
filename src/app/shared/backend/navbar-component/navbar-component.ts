import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedService } from '../../../services/shared-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-component',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.scss',
})
export class NavbarComponent {
searchQuery: string = '';
  notificationMenuVisible: boolean = false;

  constructor(private sharedService: SharedService) {}

  toggleSidebar() {
    this.sharedService.toggleSidebar();
  }

  toggleNotificationMenu() {
    this.notificationMenuVisible = !this.notificationMenuVisible;
  }

  onSearchSubmit(event: Event) {
    event.preventDefault();
  }
}
