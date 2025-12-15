import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedService } from '../../../services/shared-service';
import { RouterLink, RouterLinkActive } from '@angular/router';

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

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.sidebarVisibility$.subscribe((visible) => {
      this.isSidebarHidden = !visible;
    });
  }

  toggleSidebar() {
    this.sharedService.toggleSidebar();
  }
}
