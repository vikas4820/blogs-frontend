import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalScript } from './services/global-script';
import { LoaderComponent } from './shared/loader-component/loader-component';
import { AuthService } from './services/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('blog-management-frontend');

  constructor(
    private authService: AuthService,
  ) {
    this.authService.initializeFromToken();
  }
}
