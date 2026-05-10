export class User {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;

  constructor(
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    id?: number
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.phone = phone;
  }
}