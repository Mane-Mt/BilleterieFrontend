import { Component, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ConcertService } from '../../../services/concert-service';
import { isValidDate } from 'rxjs/internal/util/isDate';
import { Concert, ConcertCreate } from '../../../models/concert';

@Component({
  selector: 'app-concert-form',
  standalone: false,
  templateUrl: './concert-form.html',
  styleUrl: './concert-form.css',
})
export class ConcertForm {
  private readonly router = inject(Router);
  private readonly concertsApiService = inject(ConcertService); // À adapter selon votre service

  // Signals pour les champs du formulaire
  readonly name = signal<string>('');
  readonly image = signal<string>('');
  readonly description = signal<string>('');
  readonly location = signal<string>('');
  readonly musicalGenre = signal<string>('');
  readonly placeNumber = signal<number>(0);
  readonly popularity = signal<number>(0);
  readonly price = signal<number>(0);
  readonly date = signal<string>('');
  readonly startTime = signal<string>('');
  readonly endTime = signal<string>('');
  readonly organizerId = signal<number>(0);
  readonly artistIds = signal<number[]>([])

  // Validation calculée
  readonly ready = computed(() => 
    this.name().length > 0 && 
    this.location().length > 0 && 
    this.organizerId()> 0 &&
    this.placeNumber() > 0
  );

  onSubmit() {
    if (!this.ready()) {
      return;
    }

    const newConcert = new ConcertCreate(
    this.image() || '🎤',
    this.name(),
    this.description(),
    this.location(),
    this.musicalGenre(),
    this.placeNumber(),
    this.placeNumber(), // availableTickets initialement égal à placeNumber
    this.popularity(),
    this.price(),
    this.date(),
    this.startTime(),
    this.endTime(),
    this.organizerId(),
    false, // isValidated
    this.artistIds()
  );
    
    this.concertsApiService.createConcert(newConcert).subscribe({
      next: () => this.router.navigate(['/concerts']),
      error: (err) => {
        console.error('Error creating concert', err);
        alert(`Une erreur s'est produite lors de la création.`);
      }
    });
  }
}