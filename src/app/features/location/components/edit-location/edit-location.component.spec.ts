import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReviewComponent } from './edit-location.component';

describe('EditReviewComponent', () => {
  let component: EditReviewComponent;
  let fixture: ComponentFixture<EditReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditReviewComponent]
    });
    fixture = TestBed.createComponent(EditReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
