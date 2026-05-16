import { Concert } from "./concert";

export interface Ticket {
  id: number;
  concert: Concert;
  quantity: number;
  totalPrice: number;
  reference: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'transferred'; // Ajout de transferred
  buyerEmail: string; // Le destinataire actuel
  transferorEmail?: string; // L'ancien propriétaire
  purchaseDate: string;
}

export class TicketCreate{
    public constructor(
       public concertId:number,
       public quantity:number,
       public buyerEmail: string,
    ){
        this.concertId = concertId;
        this.quantity = quantity;
        this.buyerEmail = buyerEmail;
    }
}
