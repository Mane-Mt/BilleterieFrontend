import { Component, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ConcertService } from '../../concert-service';
import { FormsModule } from '@angular/forms';

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
  readonly description = signal<string>('');
  readonly location = signal<string>('');
  readonly musicalGenre = signal<string>('');
  readonly placeNumber = signal<number>(0);
  readonly popularity = signal<number>(0);
  readonly price = signal<number>(0);
  readonly organizerId = signal<string>('');

  // Validation calculée
  readonly ready = computed(() => 
    this.name().length > 0 && 
    this.location().length > 0 && 
    this.organizerId().length > 0 &&
    this.placeNumber() > 0
  );

  onSubmit() {
    if (!this.ready()) {
      return;
    }

    const concert = {
      name: this.name(),
      description: this.description(),
      location: this.location(),
      musicalGenre: this.musicalGenre(),
      placeNumber: this.placeNumber(),
      popularity: this.popularity(),
      price: this.price(),
      organizerId: this.organizerId()
    };

    this.concertsApiService.createConcert(concert).subscribe({
      next: () => this.router.navigate(['/concerts']),
      error: (err) => {
        console.error('Error creating concert', err);
        alert(`Une erreur s'est produite lors de la création.`);
      }
    });
  }
}