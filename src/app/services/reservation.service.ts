import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  constructor(private firestore: AngularFirestore) {}

  // Obtener todas las reservas
  getAllReservations(): Observable<any[]> {
    return this.firestore.collection('reservas').valueChanges();
  }

  // Añadir una nueva reserva
  addReservation(reservation: any): Promise<void> {
    const reservationId = `${reservation.date}_${reservation.time}`;
    return this.firestore.collection('reservas').doc(reservationId).set(reservation);
  }

  // Verificar si una reserva ya existe
  checkReservation(date: string, time: string): Observable<any> {
    const reservationId = `${date}_${time}`;
    return this.firestore.collection('reservas').doc(reservationId).valueChanges();
  }
}
