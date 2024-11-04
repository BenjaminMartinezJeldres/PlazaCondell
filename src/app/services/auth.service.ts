// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  // Método para iniciar sesión con correo y contraseña
  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  // Método para registrar usuarios con un rol específico (cliente o administrador)
  register(email: string, password: string, role: string) {
  return this.auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
    const userId = userCredential.user?.uid;
    if (userId) {
      // Almacena el rol del usuario en Firestore
      return this.firestore.collection('users').doc(userId).set({ role }).then(() => {
        // Enviar el correo de verificación
        return userCredential.user?.sendEmailVerification().then(() => {
          console.log('Correo de verificación enviado a: ', email);
        });
      });
    }
    return null;
  });
}


  // Método para obtener el rol del usuario
  getUserRole(userId: string) {
    return this.firestore.collection('users').doc<UserData>(userId).get().pipe(
      map(doc => doc.exists ? (doc.data() as UserData)?.role : null)
    );
  }

  // Método para cerrar sesión
  logout() {
    return this.auth.signOut();
  }
}

// Define la interfaz para los datos de usuario
interface UserData {
  role: string;
}
