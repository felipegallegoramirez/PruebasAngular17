import { Person } from "./survey";

export class User{

  _id:string ;
  name:string;
  email:string;
  password:string;
  rol:string;
  files_id:Array<string>;
  post_id:Array<string>;
  bloq:Array<{
    day:Array<number>;
  }>;
  services:Array<string>;
  booking:Array<string>;
  code:string;
  active: boolean;
  description:string;
  category:string;
  locate:string;
  link:string;
  followers:Array<string>;
  follows:Array<Person>;

  constructor(
    _id:string = "",
    name:string = "",
    email:string = "",
    password:string = "",
    rol:string = "",
    files_id:Array<string> = [],
    post_id:Array<string> = [],
    bloq:Array<{
      day:Array<number>,
    }> = [],
    services:Array<string> = [],
    booking:Array<string> = [],
    code:string = "",
    active: boolean = false,
    description:string = "",
    category:string = "",
    locate:string = "",
    link:string = "",
    followers:Array<string> = [],
    follows:Array<Person> = []
    ){
      this._id = _id;
      this.name = name;
      this.email = email;
      this.password = password;
      this.rol = rol;
      this.files_id = files_id;
      this.post_id = post_id;
      this.bloq = bloq;
      this.services = services;
      this.booking = booking;
      this.code = code;
      this.active = active;
      this.description = description;
      this.category = category;
      this.locate = locate;
      this.link = link;
      this.followers = followers;
      this.follows = follows;
  }
}

export interface userLogin{
  email: string;
  password: string;
}