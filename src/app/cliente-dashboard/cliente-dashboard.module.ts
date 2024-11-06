// src/app/cliente-dashboard/cliente-dashboard.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClienteDashboardPageRoutingModule } from './cliente-dashboard-routing.module';
import { ClienteDashboardPage } from './cliente-dashboard.page';
import { CertificadoComponent } from '../components/certificado/certificado.component'; // Importa CertificadoComponent

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClienteDashboardPageRoutingModule
  ],
  declarations: [
    ClienteDashboardPage,
    CertificadoComponent  // Declara CertificadoComponent aquí
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Añade esta línea para manejar componentes personalizados de Ionic
})
export class ClienteDashboardPageModule {}
