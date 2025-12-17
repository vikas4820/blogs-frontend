import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalScript } from './services/global-script';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('blog-management-frontend');

  constructor(private globalScriptService: GlobalScript) {}
}
