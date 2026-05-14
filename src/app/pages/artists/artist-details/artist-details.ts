import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService, Artist } from '../../../services/artist-service';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.html',
  styleUrl: './artist-details.css',
  standalone: false,
})
export class ArtistDetails implements OnInit {
  private artistService = inject(ArtistService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  artist: Artist | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.artistService.getArtist(+id).subscribe((artist: Artist) => {
        this.artist = artist;
        this.cdr.detectChanges();
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/artists']);
  }

  goEdit(): void {
    this.router.navigate(['/artists', this.artist?.id, 'edit']);
  }
}