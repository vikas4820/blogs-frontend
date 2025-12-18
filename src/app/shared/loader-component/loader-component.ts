import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from '../../services/loader-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader-component',
  imports: [CommonModule],
  templateUrl: './loader-component.html',
  styleUrl: './loader-component.scss',
})
export class LoaderComponent {

  isLoading$!: Observable<boolean>;

  constructor(private loaderService: LoaderService) {
    this.isLoading$ = this.loaderService.loader$;
  }
}
