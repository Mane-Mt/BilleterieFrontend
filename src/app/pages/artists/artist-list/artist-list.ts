import { Component, OnInit, inject, signal, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ArtistService, Artist } from '../../../artist-service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.html',
  styleUrl: './artist-list.css',
  standalone: false,
})
export class ArtistList implements OnInit {
  artists = signal<Artist[]>([]);
  private artistService = inject(ArtistService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.artistService.getArtists().subscribe((artists: Artist[]) => {
      this.artists.set(artists);
      this.cdr.detectChanges();
    });
  }

  deleteArtist(id: number): void {
    this.artistService.deleteArtist(id).subscribe(() => {
      this.artists.update(a => a.filter(artist => artist.id !== id));
      this.cdr.detectChanges();
    });
  }
}