// src/app/cliente-dashboard/cliente-dashboard.page.ts
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CertificadoComponent } from '../components/certificado/certificado.component';

@Component({
  selector: 'app-cliente-dashboard',
  templateUrl: './cliente-dashboard.page.html',
  styleUrls: ['./cliente-dashboard.page.scss'],
})
export class ClienteDashboardPage {

  constructor(private modalController: ModalController) {}

  async verCertificado() {
    const modal = await this.modalController.create({
      component: CertificadoComponent,
    });
    await modal.present();
  }
}
