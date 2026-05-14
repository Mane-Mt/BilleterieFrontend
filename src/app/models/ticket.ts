import { Concert } from "./concert";

export interface Ticket {
    
  id: number;
  concertId: number;
  concert: Concert;
  quantity: number;
  totalPrice: number;
  reference: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  purchaseDate: string;
  buyerEmail?: string;

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
