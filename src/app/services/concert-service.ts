import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Concert } from '../models/concert';

@Injectable({
  providedIn: 'root',
})
export class ConcertService {
  buyTicket(id: any, quantity: number) {
    throw new Error('Method not implemented.');
  }
  
  private readonly http = inject(HttpClient)
  private readonly baseApiUrl = 'http://localhost:4200/api'

  // getConcerts(): Observable<Concert[]>{
  //   return this.http.get<Concert[]>(`${this.baseApiUrl}/concerts`);
  // }

  getConcerts(): Observable<Concert[]> {
    return this.http.get<Concert[]>(`${this.baseApiUrl}/concerts`);
  }

  createConcert(concert:Concert): Observable<void> {
    return this.http.post<void>(`${this.baseApiUrl}/concerts`, concert);
  }

  getConcertById(id: number) {
    return this.http.get<Concert>(`${this.baseApiUrl}/concerts/${id}`);
  }
}
