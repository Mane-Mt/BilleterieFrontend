import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Concert } from './models/concert';

export interface AdminStats {
  totalConcerts: number;
  totalUsers: number;
  totalArtists: number;
  totalOrganizers: number;
  totalTickets: number;
}

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly http = inject(HttpClient);
  private readonly baseApiUrl = '/api';

  getStats(): Observable<AdminStats> {
    return this.http.get<AdminStats>(`${this.baseApiUrl}/admin/stats`);
  }

  getConcerts(): Observable<Concert[]> {
    return this.http.get<Concert[]>(`${this.baseApiUrl}/concerts`);
  }

  validateConcert(id: number): Observable<Concert> {
    return this.http.put<Concert>(`${this.baseApiUrl}/concerts/${id}`, { isValidated: true });
  }

  deleteConcert(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseApiUrl}/concerts/${id}`);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/users/`);
  }

  getOrganizers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/organizers/`);
  }

  getTickets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/tickets/`);
  }

  getArtists(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/artists/`);
  }
}