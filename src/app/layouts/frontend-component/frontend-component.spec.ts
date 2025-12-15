import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendComponent } from './frontend-component';

describe('FrontendComponent', () => {
  let component: FrontendComponent;
  let fixture: ComponentFixture<FrontendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontendComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
