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
  maxReservationsPerWeek = 1;

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

    if (await this.isDateReserved(this.selectedDate)) {
      alert('Esta fecha ya está reservada. Selecciona otra fecha.');
      return;
    }

    if (await this.hasReachedWeeklyLimit()) {
      alert('Ya has alcanzado el límite de reservas para esta semana.');
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

    // Verifica si snapshot no es undefined antes de acceder a size
    return snapshot?.size ? snapshot.size > 0 : false;
  }

  async hasReachedWeeklyLimit(): Promise<boolean> {
    if (!this.currentUserEmail) return false;

    const startOfWeek = this.getStartOfWeek(new Date());
    const endOfWeek = this.getEndOfWeek(new Date());

    const snapshot = await this.firestore.collection('reservas', ref =>
      ref
        .where('user', '==', this.currentUserEmail)
        .where('date', '>=', startOfWeek)
        .where('date', '<=', endOfWeek)
    ).get().toPromise();

    // Verifica si snapshot no es undefined antes de acceder a size
    return snapshot?.size ? snapshot.size >= this.maxReservationsPerWeek : false;
  }

  getStartOfWeek(date: Date): string {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const startDate = new Date(date.setDate(diff));
    return startDate.toISOString().split('T')[0];
  }

  getEndOfWeek(date: Date): string {
    const day = date.getDay();
    const diff = date.getDate() + (7 - day);
    const endDate = new Date(date.setDate(diff));
    return endDate.toISOString().split('T')[0];
  }
}
