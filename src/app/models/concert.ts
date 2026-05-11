
export class Concert {
  id?: number;
  name: string;
  description: string;
  location: string;
  musicalGenre: string;
  placeNumber: number;
  popularity: number;
  price: number;
  date: string;
  organizerId: string;

  constructor(
    name: string,
    description: string,
    location: string,
    musicalGenre: string,
    placeNumber: number,
    popularity: number,
    price: number,
    date: string,
    organizerId: string
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
  }

}
