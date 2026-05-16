import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Concert, ConcertCreate } from '../models/concert';

@Injectable({
  providedIn: 'root',
})
export class ConcertService {

  private readonly http = inject(HttpClient);
  private readonly baseApiUrl = 'http://localhost:4200/api';

 
  getConcerts(): Observable<Concert[]> {
    return this.http.get<Concert[]>(`${this.baseApiUrl}/concerts`);
  }


  searchConcerts(q: string): Observable<Concert[]> {
    const params = new HttpParams().set('q', q);
    return this.http.get<Concert[]>(`${this.baseApiUrl}/concerts/search`, { params });
  }

  getConcertsByMaxPrice(maxPrice: number): Observable<Concert[]> {
    const params = new HttpParams().set('price', maxPrice.toString());
    return this.http.get<Concert[]>(`${this.baseApiUrl}/concerts/maxprice`, { params });
  }

  getConcertsByLocation(location: string): Observable<Concert[]> {
    const params = new HttpParams().set('location', location);
    return this.http.get<Concert[]>(`${this.baseApiUrl}/concerts/location`, { params });
  }

  getConcertsOrderByPrice(): Observable<Concert[]> {
    return this.http.get<Concert[]>(`${this.baseApiUrl}/concerts/sortByPrice`);
  }


  getConcertsOrderByDate(): Observable<Concert[]> {
    return this.http.get<Concert[]>(`${this.baseApiUrl}/concerts/sortByDate`);
  }

  
  getConcertsOrderByPopularity(): Observable<Concert[]> {
    return this.http.get<Concert[]>(`${this.baseApiUrl}/concerts/sortByPopularity`);
  }

  getConcertById(id: number): Observable<Concert> {
    return this.http.get<Concert>(`${this.baseApiUrl}/concerts/${id}`);
  }

  createConcert(concert: ConcertCreate): Observable<void> {
    return this.http.post<void>(`${this.baseApiUrl}/concerts`, concert);
  }
}