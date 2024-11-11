import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  isLoggedIn = false;
  isAdmin = false;
  isCliente = false;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
        this.authService.getUserRole(user.uid).subscribe(role => {
          this.isAdmin = (role === 'admin');
          this.isCliente = (role === 'cliente');
        });
      } else {
        this.isLoggedIn = false;
        this.isAdmin = false;
        this.isCliente = false;
      }
    });
  }

  verCertificado() {
    this.router.navigate(['/certificado']);
  }

  logout() {
    this.authService.logout().then(() => {
      this.isLoggedIn = false;
      this.isAdmin = false;
      this.isCliente = false;
      this.router.navigate(['/home']);
    });
  }
}
