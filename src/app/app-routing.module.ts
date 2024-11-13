import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CertificadoComponent } from './components/certificado/certificado.component';

const routes: Routes = [
  // Redirección por defecto al 'home' al cargar la aplicación
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  // Ruta para la página de inicio
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  // Ruta para la página de inicio de sesión
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  // Ruta para registrar un nuevo usuario
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  // Ruta para la gestión de usuarios (solo para administradores)
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersPageModule)
  },
  // Ruta para la descarga del certificado
  {
    path: 'certificado',
    component: CertificadoComponent
  },
  // Ruta para la reserva del gimnasio
  {
    path: 'gym-reservation',
    loadChildren: () => import('./components/gym-reservation/gym-reservation.module').then(m => m.GymReservationPageModule)
  },
  // Ruta para el historial de reservas (si tienes esta página implementada)
  {
    path: 'gym-reservation-history',
    loadChildren: () => import('./components/gym-reservation-history/gym-reservation-history.module').then(m => m.GymReservationHistoryPageModule)
  },
  // Página 404 - redirección si no se encuentra la ruta
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
