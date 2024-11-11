import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { GymReservationPageRoutingModule } from './gym-reservation-routing.module';
import { GymReservationPage } from './gym-reservation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GymReservationPageRoutingModule
  ],
  declarations: [GymReservationPage]
})
export class GymReservationPageModule {}
