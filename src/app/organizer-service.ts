import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class Organizer {
  id?: number;
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  phone: string = '';
}

@Injectable({
  providedIn: 'root',
})
export class OrganizerService {
  private readonly http = inject(HttpClient);
  private readonly baseApiUrl = '/api';

  getOrganizers(): Observable<Organizer[]> {
    return this.http.get<Organizer[]>(`${this.baseApiUrl}/organizers/`);
  }

  getOrganizer(id: number): Observable<Organizer> {
    return this.http.get<Organizer>(`${this.baseApiUrl}/organizers/${id}`);
  }

  createOrganizer(organizer: Organizer): Observable<Organizer> {
    return this.http.post<Organizer>(`${this.baseApiUrl}/organizers/`, organizer);
  }

  updateOrganizer(id: number, organizer: Organizer): Observable<Organizer> {
    return this.http.put<Organizer>(`${this.baseApiUrl}/organizers/${id}`, organizer);
  }

  deleteOrganizer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseApiUrl}/organizers/${id}`);
  }
}