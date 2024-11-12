import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gym-reservation-history',
  templateUrl: './gym-reservation-history.page.html',
  styleUrls: ['./gym-reservation-history.page.scss'],
})
export class GymReservationHistoryPage implements OnInit {
  reservations$: Observable<any[]>;

  constructor(private firestore: AngularFirestore) {
    this.reservations$ = this.firestore.collection('reservas').valueChanges();
  }

  ngOnInit() {}
}
