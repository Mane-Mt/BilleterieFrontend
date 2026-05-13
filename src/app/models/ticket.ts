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
