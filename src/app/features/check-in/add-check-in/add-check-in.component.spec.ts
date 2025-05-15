import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReviewComponent } from './add-check-in.component';

describe('AddReviewComponent', () => {
  let component: AddReviewComponent;
  let fixture: ComponentFixture<AddReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddReviewComponent]
    });
    fixture = TestBed.createComponent(AddReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
