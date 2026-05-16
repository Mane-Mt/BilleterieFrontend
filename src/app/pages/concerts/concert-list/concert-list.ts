import { Component, signal, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Concert } from '../../../models/concert';
import { ConcertService } from '../../../services/concert-service';

@Component({
  selector: 'app-concert-list',
  standalone: false,
  templateUrl: './concert-list.html',
  styleUrl: './concert-list.css',
})
export class ConcertList implements OnInit {

  concerts = signal<Concert[]>([]);
  allConcerts: Concert[] = []; // sauvegarde de tous les concerts pour filtrer
  isLoading = signal(true);

  searchControl = new FormControl('');
  maxPriceControl = new FormControl(200);
  selectedGenre = '';
  selectedSort = 'date';

  // Liste fixe des genres — ne pas modifier ici, ajouter dans le tableau uniquement
  genres = ['Rock', 'Pop', 'Électro', 'Jazz', 'Hip-Hop', 'Classique', 'Gospel', 'Autre'];

  sortOptions = [
    { value: 'date',       label: 'Date' },
    { value: 'price',      label: 'Prix croissant' },
    { value: 'popularity', label: 'Popularité' },
  ];

  constructor(private concertService: ConcertService) {}

  ngOnInit() {
    this.loadConcerts();
  }

  // Charge tous les concerts depuis le backend
  loadConcerts() {
    this.isLoading.set(true);
    this.concertService.getConcerts().subscribe({
      next: (data) => {
        this.allConcerts = data;
        this.applyFilters();
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erreur chargement concerts :', err);
        this.isLoading.set(false);
      }
    });
  }

  // Applique la recherche texte → appel backend
  onSearch() {
    const q = this.searchControl.value?.trim();
    if (!q) {
      this.loadConcerts();
      return;
    }
    this.isLoading.set(true);
    this.concertService.searchConcerts(q).subscribe({
      next: (data) => {
        this.allConcerts = data;
        this.applyFilters();
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erreur recherche :', err);
        this.isLoading.set(false);
      }
    });
  }

  // Applique le filtre prix max → appel backend
  onPriceChange() {
    const max = this.maxPriceControl.value;
    if (max === null) return;
    this.isLoading.set(true);
    console.log(max)
    this.concertService.getConcertsByMaxPrice(max).subscribe({

      next: (data) => {
        console.log(data)
        this.allConcerts = data;
        this.applyFilters();
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erreur filtre prix :', err);
        this.isLoading.set(false);
      }
    });
  }

  // Applique le tri sélectionné → appel backend
  applySort(sort: string) {
    this.selectedSort = sort;
    this.isLoading.set(true);

    // On choisit le bon appel selon le tri
    let appel;
    if (sort === 'price') {
      appel = this.concertService.getConcertsOrderByPrice();
    } else if (sort === 'popularity') {
      appel = this.concertService.getConcertsOrderByPopularity();
    } else {
      appel = this.concertService.getConcertsOrderByDate();
    }

    appel.subscribe({
      next: (data) => {
        this.allConcerts = data;
        this.applyFilters();
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erreur tri :', err);
        this.isLoading.set(false);
      }
    });
  }

  // Sélectionne ou désélectionne un genre (filtre côté client)
  selectGenre(genre: string) {
    if (this.selectedGenre === genre) {
      this.selectedGenre = ''; // désélectionner si déjà actif
    } else {
      this.selectedGenre = genre;
    }
    this.applyFilters();
  }

  // Filtre la liste côté client selon le genre sélectionné
  applyFilters() {
    if (!this.selectedGenre) {
      this.concerts.set(this.allConcerts);
    } else {
      const filtered = this.allConcerts.filter(c =>
        c.musicalGenre?.toLowerCase() === this.selectedGenre.toLowerCase()
      );
      this.concerts.set(filtered);
    }
  }

  // Réinitialise tous les filtres et recharge
  clearFilters() {
    this.searchControl.setValue('');
    this.maxPriceControl.setValue(200);
    this.selectedGenre = '';
    this.selectedSort = 'date';
    this.loadConcerts();
  }

  getAvailabilityLabel(c: Concert): string {
    if (c.availableTickets === 0) return 'Complet';
    if (c.availableTickets < 50)  return 'Limité';
    return 'Disponible';
  }

  getAvailabilityClass(c: Concert): string {
    if (c.availableTickets === 0) return 'danger';
    if (c.availableTickets < 50)  return 'warn';
    return 'ok';
  }
}