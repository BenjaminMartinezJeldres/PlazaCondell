import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GymReservationHistoryPage } from './gym-reservation-history.page';

describe('GymReservationHistoryPage', () => {
  let component: GymReservationHistoryPage;
  let fixture: ComponentFixture<GymReservationHistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GymReservationHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
