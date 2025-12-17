import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsFormComponent } from './blogs-form-component';

describe('BlogsFormComponent', () => {
  let component: BlogsFormComponent;
  let fixture: ComponentFixture<BlogsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogsFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
