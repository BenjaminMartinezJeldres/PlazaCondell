import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GymReservationHistoryPage } from './gym-reservation-history.page';

const routes: Routes = [
  {
    path: '',
    component: GymReservationHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GymReservationHistoryPageRoutingModule {}
