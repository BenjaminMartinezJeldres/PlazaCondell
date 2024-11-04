import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClienteDashboardPageRoutingModule } from './cliente-dashboard-routing.module';

import { ClienteDashboardPage } from './cliente-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClienteDashboardPageRoutingModule
  ],
  declarations: [ClienteDashboardPage]
})
export class ClienteDashboardPageModule {}
