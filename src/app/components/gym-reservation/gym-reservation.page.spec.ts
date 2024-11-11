import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GymReservationPage } from './gym-reservation.page';

describe('GymReservationPage', () => {
  let component: GymReservationPage;
  let fixture: ComponentFixture<GymReservationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GymReservationPage]
    }).compileComponents();

    fixture = TestBed.createComponent(GymReservationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
