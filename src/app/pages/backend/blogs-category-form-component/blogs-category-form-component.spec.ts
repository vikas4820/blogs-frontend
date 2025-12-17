import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsCategoryFormComponent } from './blogs-category-form-component';

describe('BlogsCategoryFormComponent', () => {
  let component: BlogsCategoryFormComponent;
  let fixture: ComponentFixture<BlogsCategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogsCategoryFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogsCategoryFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
