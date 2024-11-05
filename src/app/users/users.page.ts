// src/app/users/users.page.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserData } from '../models/user.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  users: UserData[] = [];

  constructor(
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  // Método para cargar usuarios
  loadUsers() {
    this.authService.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }

  async editUser(user: UserData) {
    const alert = await this.alertController.create({
      header: 'Editar Usuario',
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: 'Nueva contraseña'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Guardar',
          handler: async (data) => {
            if (data.password) {
              await this.authService.updateUserPassword(user.id, data.password);
            }
            this.loadUsers(); // Refresca la lista para ver el cambio
          }
        }
      ]
    });
  
    await alert.present();
  }

  async deleteUser(userId: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este usuario? Esta acción es útil si el usuario olvidó su correo.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.authService.deleteUser(userId).then(() => {
              this.loadUsers();
            });
          }
        }
      ]
    });
  
    await alert.present();
  }
}
