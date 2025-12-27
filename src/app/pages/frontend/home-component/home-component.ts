import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoaderService } from '../../../services/loader-service';
import { BlogsService } from '../../../services/blogs-service';
import { firstValueFrom } from 'rxjs';
import { BlogSliderService } from '../../../services/blog-slider-service';

declare var $: any;

@Component({
  selector: 'app-home-component',
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent implements AfterViewInit {

  blogs: any[] = [];
  sliderData: any[] = [];

  constructor(
    private loader: LoaderService,
    private cdr: ChangeDetectorRef,
    private blogService: BlogsService,
    private blogSliderService: BlogSliderService,
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      $('#blogLandingSlider').carousel({
        interval: 4500,
        ride: 'carousel',
        pause: false,
        wrap: true
      });
    }, 0);
  }

  async ngOnInit() {
    try {
      this.loader.show();
      //await this.loadBlogs();
      await this.loadSliderData();
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error fetching blog categories:', error);
    } finally {
      this.loader.hide();
    }
  }

  async loadBlogs() {
    try {
      const blogs = await this.blogService.findAll().toPromise();
      this.blogs = blogs ?? [];
      console.log("this.blogs", this.blogs)
    } catch (error) {
      
    } finally {

    }
  }

  async loadSliderData() {
    try {
      this.sliderData = await firstValueFrom(
        this.blogSliderService.findAll()
      )
      console.log("sliderData", this.sliderData)
    } catch (error) {
      
    } finally {

    }
  }

}
