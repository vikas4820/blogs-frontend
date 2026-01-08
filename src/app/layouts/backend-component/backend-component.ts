import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/backend/navbar-component/navbar-component';
import { SidebarComponent } from '../../shared/backend/sidebar-component/sidebar-component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../services/shared-service';

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

  isSidebarHidden = false;

  constructor(
    private sharedService: SharedService,
  ) {}

  ngOnInit(): void {
    this.sharedService.sidebarVisibility$.subscribe((visible) => {
      this.isSidebarHidden = !visible;
    });
  }

}
