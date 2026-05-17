import { flatEmojiMap } from "../constants/concert-emoji.constants";
import { User } from "./user";

export class Concert {
  public id: number;
  public image: string;
  public name: string;
  public description: string;
  public location: string;
  public musicalGenre: string;
  public placeNumber: number;
  public availableTickets: number;
  public popularity: number;
  public price: number;
  public date: string;
  public startTime: string;
  public endTime: string;
  public organizerId: string | number;
  public isValidated: boolean;
  public artists: User[];

  constructor(
    id: number = 0,
    image: string = '🎤',
    name: string = '',
    description: string = '',
    location: string = '',
    musicalGenre: string = '',
    placeNumber: number = 0,
    availableTickets: number = 0,
    popularity: number = 0,
    price: number = 0,
    date: string = '',
    startTime: string = '18h',
    endTime: string = '20h',
    organizerId: number = 0,
    isValidated: boolean = false,
    artists: User[] = []
  ) {
    this.id = id;
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
    this.startTime = startTime;
    this.endTime = endTime;
    this.organizerId = organizerId;
    this.isValidated = isValidated;
    this.artists = artists;
  }

  get artistNames(): string {
    if (!this.artists || this.artists.length === 0) {
      return 'Artiste inconnu';
    }
    return this.artists.map(a => `${a.firstname} ${a.lastname}`).join(', ');
  }

  getImage(): string {
    return flatEmojiMap[this.image.toLowerCase().trim()] || '🎤';
  }
}

export class ConcertCreate {
  public image: string;
  public name: string;
  public description: string;
  public location: string;
  public musicalGenre: string;
  public placeNumber: number;
  public price: number;
  public popularity: number;
  public organizerId: number;
  public date: string;
  public startTime: string;
  public endTime: string;
  public artistIds: number[];

  constructor(
    image: string = 'autre',
    name: string = '',
    description: string = '',
    location: string = '',
    musicalGenre: string = '',
    placeNumber: number = 0,
    price: number = 0,
    popularity: number = 1,
    organizerId: number = 0,
    date: string = '',
    startTime: string = '18h',
    endTime: string = '20h',
    artistIds: number[] = []
  ) {
    this.image = image;
    this.name = name;
    this.description = description;
    this.location = location;
    this.musicalGenre = musicalGenre;
    this.placeNumber = placeNumber;
    this.price = price;
    this.popularity = popularity;
    this.organizerId = organizerId;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
    this.artistIds = artistIds;
  }
}