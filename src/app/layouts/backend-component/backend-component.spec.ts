import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendComponent } from './backend-component';

describe('BackendComponent', () => {
  let component: BackendComponent;
  let fixture: ComponentFixture<BackendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackendComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
