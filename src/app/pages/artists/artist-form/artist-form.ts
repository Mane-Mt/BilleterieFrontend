import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService, Artist } from '../../../services/artist-service';

@Component({
  selector: 'app-artist-form',
  templateUrl: './artist-form.html',
  styleUrl: './artist-form.css',
  standalone: false,
})
export class ArtistForm implements OnInit {
  private artistService = inject(ArtistService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  isEditMode = false;
  artistId: number | null = null;

  firstname = '';
  lastname = '';
  email = '';
  phone = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.artistId = +id;
      this.artistService.getArtist(this.artistId).subscribe((artist: Artist) => {
        this.firstname = artist.firstname;
        this.lastname = artist.lastname;
        this.email = artist.email;
        this.phone = artist.phone;
        this.cdr.detectChanges();
      });
    }
  }

  isValidEmail(): boolean {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    return emailRegex.test(this.email);
  }

  isValidPhone(): boolean {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(this.phone);
  }

  submit(): void {
    if (this.email && !this.isValidEmail()) {
      alert('Email invalide !');
      return;
    }
    if (this.phone && !this.isValidPhone()) {
      alert('Téléphone invalide — 10 chiffres requis !');
      return;
    }

    const artist = new Artist();
    artist.firstname = this.firstname;
    artist.lastname = this.lastname;
    artist.email = this.email;
    artist.phone = this.phone;

    if (this.isEditMode && this.artistId) {
      artist.id = this.artistId;
      this.artistService.updateArtist(this.artistId, artist).subscribe(() => {
        this.router.navigate(['/artists']);
      });
    } else {
      this.artistService.createArtist(artist).subscribe(() => {
        this.router.navigate(['/artists']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/artists']);
  }
}