import { CommonModule } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../../../services/shared-service';
import { AuthService } from '../../../services/auth-service';
import { TokenPayload, UserState } from '../../../states/user-state.service';

@Component({
  selector: 'app-navbar-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.scss',
})
export class NavbarComponent {
  searchQuery: string = '';
  notificationMenuVisible: boolean = false;
  user!: Signal<TokenPayload | null>;
  roleName!: Signal<string | null>;
  isAdmin!: Signal<boolean>;

  constructor(
    private sharedService: SharedService,
    private userState: UserState,
  ) { 
    this.user = this.userState.user;
    this.roleName = this.userState.roleName;
    this.isAdmin = this.userState.isAdmin;
    console.log("this.user", this.user())
    console.log("this.roleName", this.roleName())
    console.log("this.isAdmin", this.isAdmin())
  }

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
