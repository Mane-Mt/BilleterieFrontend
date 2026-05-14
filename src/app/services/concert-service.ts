import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Concert, ConcertCreate } from '../models/concert';

@Injectable({
  providedIn: 'root',
})
export class ConcertService {

  
  private readonly http = inject(HttpClient)
  private readonly baseApiUrl = 'http://localhost:4200/api'

  // getConcerts(): Observable<Concert[]>{
  //   return this.http.get<Concert[]>(`${this.baseApiUrl}/concerts`);
  // }

  getConcerts(): Observable<Concert[]> {
    return this.http.get<Concert[]>(`${this.baseApiUrl}/concerts`);
  }

  createConcert(concert:ConcertCreate): Observable<void> {
    return this.http.post<void>(`${this.baseApiUrl}/concerts`, concert);
  }

  getConcertById(id: number) {
    return this.http.get<Concert>(`${this.baseApiUrl}/concerts/${id}`);
  }
}
