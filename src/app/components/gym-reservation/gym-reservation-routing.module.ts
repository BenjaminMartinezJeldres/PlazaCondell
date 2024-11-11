import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GymReservationPage } from './gym-reservation.page';

const routes: Routes = [
  {
    path: '',
    component: GymReservationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GymReservationPageRoutingModule {}
