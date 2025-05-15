import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCheckInListComponent } from './user-check-in-list.component';

describe('UserCheckInListComponent', () => {
  let component: UserCheckInListComponent;
  let fixture: ComponentFixture<UserCheckInListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserCheckInListComponent]
    });
    fixture = TestBed.createComponent(UserCheckInListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
