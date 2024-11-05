import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  isLoggedIn = false;
  isAdmin = false;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
        this.authService.getUserRole(user.uid).subscribe(role => {
          this.isAdmin = (role === 'admin');
        });
      } else {
        this.isLoggedIn = false;
        this.isAdmin = false;
      }
    });
  }

  logout() {
    this.authService.logout().then(() => {
      this.isLoggedIn = false;
      this.isAdmin = false;
    });
  }
}
