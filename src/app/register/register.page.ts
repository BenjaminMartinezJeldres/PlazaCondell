import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email: string = '';
  password: string = '';
  name:string='';
  role: string = 'cliente'; // O 'admin', según tu diseño

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.email, this.password, this.role)
      .then(() => {
        alert('Registro exitoso!'); // Mensaje de éxito
        this.router.navigate(['/home']); // Redirige al inicio
      })
      .catch(error => {
        console.error('Error al registrar:', error);
        alert('Error al registrar: ' + error.message); // Muestra el error
      });
  }
}
