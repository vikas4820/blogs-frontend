import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsCategoryComponent } from './blogs-category-component';

describe('BlogsCategoryComponent', () => {
  let component: BlogsCategoryComponent;
  let fixture: ComponentFixture<BlogsCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogsCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogsCategoryComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
