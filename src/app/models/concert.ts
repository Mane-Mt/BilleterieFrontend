export class Concert {
  id?: number;

  constructor(
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
    public isValidated: boolean = false
  ) {
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
}