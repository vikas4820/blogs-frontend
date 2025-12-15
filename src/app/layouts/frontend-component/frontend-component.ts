import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/frontend/navbar-component/navbar-component';
import { FooterComponent } from '../../shared/frontend/footer-component/footer-component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-frontend-component',
  imports: [
    RouterModule,
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: './frontend-component.html',
  styleUrl: './frontend-component.scss',
})
export class FrontendComponent {

}
