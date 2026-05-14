
import { User } from "./user";

export class Concert {
  

  constructor(
    public id: number = 0,
    public image: string = '🎤',
    public name: string = '',
    public description: string = '',
    public location: string = '',
    public musicalGenre: string = '',
    public placeNumber: number = 0,
    public availableTickets: number = 0,
    public popularity: number = 0,
    public price: number = 0,
    public date: string = '',
    public organizerId: string = '',
    public isValidated: boolean = false,
    public artists: User[] = [] 
  ) {
    this.image = image;
    this.name = name;
    this.description = description;
    this.location = location;
    this.musicalGenre = musicalGenre;
    this.placeNumber = placeNumber;
    this.popularity = popularity;
    this.price = price;
    this.date = date;
    this.organizerId = organizerId;
    this.availableTickets = availableTickets;
    this.isValidated = isValidated;  
  }

  get artistNames(): string {
    if (!this.artists || this.artists.length === 0) {
      return 'Artiste inconnu';
    }
    return this.artists.map(a => a.firstname+' '+a.lastname).join(', ');
  }

}

export class ConcertCreate {
  public constructor(
    public image: string,
    public name: string,
    public description: string,
    public location: string,
    public musicalGenre: string,
    public placeNumber: number,
    public availableTickets: number,
    public popularity: number,
    public price: number,
    public date: string, // ou Date selon votre format
    public organizerId: number,
    public isValidated: boolean = false,
    public artistIds: number[] = [] 
  ) {
    this.image = image;
    this.name = name;
    this.description = description;
    this.location = location;
    this.musicalGenre = musicalGenre;
    this.placeNumber = placeNumber;
    this.availableTickets = availableTickets;
    this.popularity = popularity;
    this.price = price;
    this.date = date;
    this.organizerId = organizerId;
    this.isValidated = isValidated;
    this.artistIds = artistIds;
  }
}