import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class Artist {
  id: number = 0;
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  phone: string = '';

  constructor(
    id: number = 0,
    firstname: string = '',
    lastname: string = '',
    musicalGenre: string = ''
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    // this.musicalGenre = musicalGenre;
  }

  get fullName(): string {
    return `${this.firstname} ${this.lastname}`.trim();
  }

  // Initiales pour l'avatar (ex: "Nicola Sirkis" → "NS")
  get initials(): string {
    const parts = this.fullName.split(' ');
    return parts.map(p => p[0]).join('').toUpperCase().slice(0, 2);
  }

}

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  private readonly http = inject(HttpClient);
  private readonly baseApiUrl = 'http://localhost:4200/api';

  getArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(`${this.baseApiUrl}/artists/`);
  }

  getArtist(id: number): Observable<Artist> {
    return this.http.get<Artist>(`${this.baseApiUrl}/artists/${id}`);
  }

  createArtist(artist: Artist): Observable<Artist> {
    return this.http.post<Artist>(`${this.baseApiUrl}/artists/`, artist);
  }

  updateArtist(id: number, artist: Artist): Observable<Artist> {
    return this.http.put<Artist>(`${this.baseApiUrl}/artists/${id}`, artist);
  }

  deleteArtist(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseApiUrl}/artists/${id}`);
  }
}