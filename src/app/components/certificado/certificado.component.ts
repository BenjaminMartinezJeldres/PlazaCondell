import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.scss']
})
export class CertificadoComponent {
  constructor(private router: Router) {}

  downloadCertificado() {
    const certificadoUrl = 'assets/CERTIFICADO_prueba.docx';
    const link = document.createElement('a');
    link.href = certificadoUrl;
    link.download = 'Certificado_Comunidad_Plaza_Condell.docx';
    link.click();
  }

  goBackToHome() {
    this.router.navigate(['/home']);
  }
}
