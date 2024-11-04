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
    this.authService.login(this.email, this.password).then((userCredential) => {
      const userId = userCredential.user?.uid;
      if (userId) {
        this.authService.getUserRole(userId).subscribe((role) => {
          if (role === 'admin') {
            this.router.navigate(['/admin-dashboard']);
          } else if (role === 'cliente') {
            this.router.navigate(['/cliente-dashboard']);
          } else {
            console.log('Rol desconocido');
          }
        });
      }
    }).catch(error => {
      console.error('Error al iniciar sesión:', error);
    });
  }
}
