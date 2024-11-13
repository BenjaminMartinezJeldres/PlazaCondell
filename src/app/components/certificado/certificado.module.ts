import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CertificadoComponent } from './certificado.component';

@NgModule({
  declarations: [CertificadoComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [CertificadoComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CertificadoModule { }
