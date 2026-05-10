import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly baseApiUrl = 'http://localhost:4200/api';

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseApiUrl}/users/`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseApiUrl}/users/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseApiUrl}/users/`, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseApiUrl}/users/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseApiUrl}/users/${id}`);
  }
}