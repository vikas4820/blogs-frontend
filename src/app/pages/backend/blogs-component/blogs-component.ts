import { Component } from '@angular/core';
import { BlogsCategoryService } from '../../../services/blogs-category-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blogs-component',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './blogs-component.html',
  styleUrl: './blogs-component.scss',
})
export class BlogsComponent {

  
}
