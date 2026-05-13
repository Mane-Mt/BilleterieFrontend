import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Concert } from './models/concert';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly http = inject(HttpClient);
  private readonly baseApiUrl = '/api';

  // Concerts
  getConcerts(): Observable<Concert[]> {
    return this.http.get<Concert[]>(`${this.baseApiUrl}/concerts`);
  }

  validateConcert(id: number): Observable<Concert> {
    return this.http.put<Concert>(`${this.baseApiUrl}/concerts/${id}`, { isValidated: true });
  }

  deleteConcert(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseApiUrl}/concerts/${id}`);
  }

  // Stats
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/users/`);
  }

  getOrganizers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/organizers/`);
  }

  getTickets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/tickets/`);
  }
}