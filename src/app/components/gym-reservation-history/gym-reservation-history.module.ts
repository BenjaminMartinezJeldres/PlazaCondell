import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GymReservationHistoryPageRoutingModule } from './gym-reservation-history-routing.module';

import { GymReservationHistoryPage } from './gym-reservation-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GymReservationHistoryPageRoutingModule
  ],
  declarations: [GymReservationHistoryPage]
})
export class GymReservationHistoryPageModule {}
