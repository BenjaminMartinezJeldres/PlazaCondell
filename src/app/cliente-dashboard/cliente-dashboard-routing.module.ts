import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteDashboardPage } from './cliente-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: ClienteDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteDashboardPageRoutingModule {}
