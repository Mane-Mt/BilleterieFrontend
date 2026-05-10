import { Component, Input } from '@angular/core';
import { Concert } from '../../models/concert';

@Component({
  selector: 'app-concert-card',
  standalone: false,
  templateUrl: './concert-card.html',
  styleUrl: './concert-card.css',
})
export class ConcertCard {
  @Input() concert!: Concert;
 
  get availabilityLabel(): string {
    if (this.concert.price === 0) return 'Complet';
    if (this.concert.price < 50) return 'Limité';
    return 'Disponible';
  }
 
  get availabilityClass(): string {
    if (this.concert.price === 0) return 'danger';
    if (this.concert.price < 50) return 'warn';
    return 'ok';
  }
 
  get daysUntil(): number {
    const today = new Date();
    const concertDate = new Date(); //this.concert.date
    return Math.ceil((concertDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  }
}
