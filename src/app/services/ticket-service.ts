import { HttpClient } from "@angular/common/http";
import { Ticket, TicketCreate } from "../models/ticket";
import { inject } from "@angular/core";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' 
})

export class TicketService {
    private readonly http = inject(HttpClient)
    private readonly baseApiUrl = 'http://localhost:4200/api'
    buyTicket(ticketCreate: TicketCreate) {
        console.log(ticketCreate);
       return this.http.post<Ticket>(`${this.baseApiUrl}/tickets`, ticketCreate);
    }
}
