import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConcertService } from '../../../services/concert-service';
import { ConcertCreate } from '../../../models/concert';
import { Artist, ArtistService } from '../../../services/artist-service';
import { CONCERT_EMOJI_GROUPS, flatEmojiMap } from '../../../constants/concert-emoji.constants';
import { OrganizerService } from '../../../services/organizer-service';

@Component({
  selector: 'app-concert-create',
  standalone: false,
  templateUrl: './concert-form.html',
  styleUrl: './concert-form.css',
})
export class ConcertForm implements OnInit {

  form!: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  emojiGroups = CONCERT_EMOJI_GROUPS;
  genres = ['Rock', 'Pop', 'Électro', 'Jazz', 'Hip-Hop', 'Classique', 'Gospel', 'Autre'];
  popularityOptions = [1, 2, 3, 4, 5];

  allArtists: Artist[] = [];
  isLoadingArtists = false;

  // Variables pour la liste déroulante des organisateurs
  allOrganizers: any[] = [];
  isLoadingOrganizers = false;

  constructor(
    private fb: FormBuilder,
    private concertService: ConcertService,
    private artistService: ArtistService,
    private organizerService: OrganizerService, // Ajout au constructeur
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      image: ['autre', Validators.required],
      location: ['', Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: [''],
      musicalGenre: ['', Validators.required],
      placeNumber: [null, [Validators.required, Validators.min(1)]],
      price: [null, [Validators.required, Validators.min(0)]],
      popularity: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
      organizerId: [null, Validators.required], // L'ID sera fourni par le mat-select du formulaire HTML
      artistIds: [[]],
    });

    this.loadArtists();
    this.loadOrganizers(); // Chargement initial des organisateurs
  }

  loadArtists() {
    this.isLoadingArtists = true;
    this.artistService.getArtists().subscribe({
      next: (data) => {
        this.allArtists = data;
        this.isLoadingArtists = false;
      },
      error: (err) => {
        console.error('Erreur chargement artistes :', err);
        this.isLoadingArtists = false;
      }
    });
  }

  // Charge la liste des organisateurs pour alimenter le mat-select
  loadOrganizers() {
    this.isLoadingOrganizers = true;
    this.organizerService.getOrganizers().subscribe({
      next: (data) => {
        this.allOrganizers = data;
        this.isLoadingOrganizers = false;
      },
      error: (err) => {
        console.error('Erreur chargement organisateurs :', err);
        this.isLoadingOrganizers = false;
      }
    });
  }

  get previewEmoji(): string {
    const key = this.form.get('image')?.value || 'autre';
    return flatEmojiMap[key.toLowerCase().trim()] || '🎵';
  }

  get selectedArtists(): Artist[] {
    const ids: number[] = this.form.get('artistIds')?.value || [];
    return this.allArtists.filter(a => ids.includes(a.id));
  }

  compareArtists(id1: number, id2: number): boolean {
    return id1 === id2;
  }

  selectGenre(genre: string) {
    this.form.patchValue({ musicalGenre: genre });
  }

  setPopularity(value: number) {
    this.form.patchValue({ popularity: value });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const newConcert = this.form.value;

    // Instanciation de ConcertCreate nettoyée et calée sur les 13 arguments attendus
    const concert = new ConcertCreate(
      newConcert.image,
      newConcert.name,
      newConcert.description,
      newConcert.location,
      newConcert.musicalGenre,
      newConcert.placeNumber,
      newConcert.price,
      newConcert.popularity,
      newConcert.organizerId,
      newConcert.date,
      newConcert.startTime,
      newConcert.endTime || '',
      newConcert.artistIds || []
    );

    this.concertService.createConcert(concert).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/admin/concerts']);
      },
      error: (err) => {
        console.error('Erreur création concert :', err);
        this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
        this.isSubmitting = false;
      }
    });
  }

  cancel() {
    this.router.navigate(['/admin/concerts']);
  }
}