import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalScript } from './services/global-script';
import { LoaderComponent } from './shared/loader-component/loader-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('blog-management-frontend');

  constructor(private globalScriptService: GlobalScript) {}
}
