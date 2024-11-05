// src/app/login/login.page.ts

import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password)
      .then(() => {
        this.router.navigate(['/home']); // Redirigir al usuario después de iniciar sesión
      })
      .catch(error => {
        alert('Error al iniciar sesión: ' + error.message);
      });
  }

  // Método para restablecer la contraseña
  resetPassword() {
    this.authService.resetPassword(this.email)
      .then(() => alert('Se ha enviado un correo de restablecimiento de contraseña'))
      .catch(error => alert('Error al enviar correo de restablecimiento: ' + error.message));
  }
}
