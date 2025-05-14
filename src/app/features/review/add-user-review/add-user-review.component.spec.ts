import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserReviewComponent } from './add-user-review.component';

describe('AddReviewComponent', () => {
  let component: AddUserReviewComponent;
  let fixture: ComponentFixture<AddUserReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUserReviewComponent]
    });
    fixture = TestBed.createComponent(AddUserReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
