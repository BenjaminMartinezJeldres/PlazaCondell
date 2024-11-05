// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserData } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}


resetPassword(email: string): Promise<void> {
  return this.auth.sendPasswordResetEmail(email);
}

  // Actualizar la contraseña del usuario
  async updateUserPassword(userId: string, newPassword: string): Promise<void> {
    const userAuth = await this.auth.currentUser;
    if (userAuth) {
      await userAuth.updatePassword(newPassword);
    } else {
      throw new Error('Usuario no autenticado. No se puede actualizar la contraseña.');
    }
  }

  // Método para iniciar sesión con correo y contraseña
  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  // Método para registrar usuarios sin afectar la sesión activa del administrador
  async register(email: string, password: string, role: string): Promise<void> {
    const currentUser = await this.auth.currentUser;
    const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
    const userId = userCredential.user?.uid;
    if (userId) {
      await this.firestore.collection('users').doc(userId).set({
        role: role,
        email // Almacena el correo del usuario aquí
      });
    }

    if (currentUser) {
      await this.auth.updateCurrentUser(currentUser);
    }
  }

  // Método para obtener el rol del usuario sin retornar undefined
  getUserRole(userId: string): Observable<string | null> {
    return this.firestore.collection('users').doc<UserData>(userId).get().pipe(
      map(doc => doc.exists ? (doc.data() as UserData)?.role ?? null : null)
    );
  }

  // Obtener todos los usuarios con datos simplificados
  getAllUsers(): Observable<UserData[]> {
    return this.firestore.collection('users').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as UserData;
        const id = a.payload.doc.id;
        return { ...data, id };
      }))
    );
  }

  // Eliminar un usuario
  deleteUser(userId: string): Promise<void> {
    return this.firestore.collection('users').doc(userId).delete();
  }

  // Obtener el usuario actual
  getCurrentUser() {
    return this.auth.authState;
  }

  // Método para cerrar sesión
  logout() {
    return this.auth.signOut();
  }
}
