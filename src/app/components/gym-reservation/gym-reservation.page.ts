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

  constructor(private firestore: AngularFirestore, private authService: AuthService) {
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
        return {
          date: data.date,
          color: 'red'
        };
      });

      // Cargar lista de reservas
      this.reservationsList = snapshot.docs.map(doc => {
        const data = doc.data() as Reserva;
        return {
          id: doc.id,
          date: data.date,
          user: data.user
        };
      });
    }
  }

  async reservar() {
    if (!this.selectedDate) {
      alert('Por favor, selecciona una fecha para la reserva.');
      return;
    }

    const isReserved = this.highlightedDates.some(d => d.date === this.selectedDate);
    if (isReserved) {
      alert('Esta fecha ya está reservada.');
      return;
    }

    // Guardar la reserva en Firestore
    try {
      await this.firestore.collection('reservas').add({
        date: this.selectedDate,
        user: this.currentUserEmail
      });
      alert('¡Reserva realizada con éxito!');
      this.loadReservedDates();
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
    this.selectedDate = event.detail.value;
  }

  isDateDisabled(date: string): boolean {
    return this.highlightedDates.some(d => d.date === date);
  }
}
