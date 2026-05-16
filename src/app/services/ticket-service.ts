import { HttpClient } from "@angular/common/http";
import { Ticket, TicketCreate } from "../models/ticket";
import { inject } from "@angular/core";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' 
})

export class TicketService {
    
   
    private readonly baseApiUrl = 'http://localhost:4200/api'

    constructor(private readonly http: HttpClient) { }

    buyTicket(ticketCreate: TicketCreate) {
       return this.http.post<Ticket>(`${this.baseApiUrl}/tickets`, ticketCreate);
    }

    getTicketsByEmail(currentEmail: string) {
       return this.http.get<Ticket[]>(`${this.baseApiUrl}/tickets`,{params: { email: currentEmail }});
    }
    transferTicket(id: number, toEmail: string) {
       return this.http.put<Ticket>(`${this.baseApiUrl}/tickets/${id}/transfer`, {newUserEmail:toEmail});
    }
    cancelTicket(id: number) {
      return this.http.put<Ticket>(`${this.baseApiUrl}/tickets/${id}/cancel`,{});
    }

    refundTicket(id: number) {
      return this.http.put<Ticket>(`${this.baseApiUrl}/tickets/${id}/refund`,{});
    }
}
