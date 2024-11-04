import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClienteDashboardPage } from './cliente-dashboard.page';

describe('ClienteDashboardPage', () => {
  let component: ClienteDashboardPage;
  let fixture: ComponentFixture<ClienteDashboardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
