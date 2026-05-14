import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class Artist {
  id?: number;
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  phone: string = '';
}

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  private readonly http = inject(HttpClient);
  private readonly baseApiUrl = '/api';

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