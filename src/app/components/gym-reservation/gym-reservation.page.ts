import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../../services/auth.service';

interface Reserva {
  id?: string;
  date: string;
  user: string;
}

@Component({
  selector: 'app-gym-reservation',
  templateUrl: './gym-reservation.page.html',
  styleUrls: ['./gym-reservation.page.scss'],
})
export class GymReservationPage implements OnInit {
  selectedDate: string = '';
  minDate: string;
  highlightedDates: { date: string, color: string }[] = [];
  reservationsList: Reserva[] = [];
  currentUserEmail: string | null = null;
  maxReservationsPerMonth = 1;

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {
    this.minDate = new Date().toISOString().split('T')[0];
  }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.currentUserEmail = user.email || '';
      }
      this.loadReservedDates();
    });
  }

  async loadReservedDates() {
    const snapshot = await this.firestore.collection<Reserva>('reservas').get().toPromise();
    if (snapshot && !snapshot.empty) {
      this.highlightedDates = snapshot.docs.map(doc => {
        const data = doc.data() as Reserva;
        return { date: data.date, color: 'red' };
      });

      this.reservationsList = snapshot.docs.map(doc => {
        const data = doc.data() as Reserva;
        return { id: doc.id, date: data.date, user: data.user };
      });
    }
  }

  async reservar() {
    if (!this.selectedDate) {
      alert('Por favor, selecciona una fecha para la reserva.');
      return;
    }

    // Verificar si la fecha ya está reservada por otro usuario
    if (await this.isDateReserved(this.selectedDate)) {
      alert('Esta fecha ya está reservada. Selecciona otra fecha.');
      return;
    }

    // Verificar si el usuario ha alcanzado el límite mensual
    if (await this.hasReachedMonthlyLimit()) {
      alert('Ya has alcanzado el límite de reservas para este mes.');
      return;
    }

    try {
      await this.firestore.collection('reservas').add({
        date: this.selectedDate,
        user: this.currentUserEmail
      });
      alert('¡Reserva realizada con éxito!');
      this.loadReservedDates();
      this.selectedDate = '';
    } catch (err) {
      console.error('Error al reservar:', err);
    }
  }

  async cancelarReserva(id: string) {
    try {
      await this.firestore.collection('reservas').doc(id).delete();
      alert('Reserva cancelada con éxito.');
      this.loadReservedDates();
    } catch (err) {
      console.error('Error al cancelar la reserva:', err);
    }
  }

  onDateChange(event: any) {
    const selected = event.detail.value;
    this.selectedDate = selected;
  }

  async isDateReserved(date: string): Promise<boolean> {
    const snapshot = await this.firestore.collection('reservas', ref =>
      ref.where('date', '==', date)
    ).get().toPromise();

    // Verificación mejorada para asegurarse de que siempre devuelva un booleano
    return snapshot?.empty === false;
  }

  async hasReachedMonthlyLimit(): Promise<boolean> {
    if (!this.currentUserEmail) return false;

    const currentMonth = new Date().toISOString().split('-').slice(0, 2).join('-');

    const snapshot = await this.firestore.collection('reservas', ref =>
      ref
        .where('user', '==', this.currentUserEmail)
        .where('date', '>=', `${currentMonth}-01`)
        .where('date', '<=', `${currentMonth}-31`)
    ).get().toPromise();

    return snapshot?.size ? snapshot.size >= this.maxReservationsPerMonth : false;
  }
}
