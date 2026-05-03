
export class Concert {
  name: string;
  description: string;
  location: string;
  musicalGenre: string;
  placeNumber: number;
  popularity: number;
  price: number;
  organizerId: string;

  constructor(
    name: string,
    description: string,
    location: string,
    musicalGenre: string,
    placeNumber: number,
    popularity: number,
    price: number,
    organizerId: string
  ) {
    this.name = name;
    this.description = description;
    this.location = location;
    this.musicalGenre = musicalGenre;
    this.placeNumber = placeNumber;
    this.popularity = popularity;
    this.price = price;
    this.organizerId = organizerId;
  }

}
