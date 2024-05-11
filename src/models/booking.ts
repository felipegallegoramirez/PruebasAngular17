export class Booking {
  _id?: string;
  profesional: string;
  service: string;
  user: string;
  day: Number;
  month: Number;
  hour: number;

  constructor(
    _id :string = "",
    profesional: string = "",
    service: string = "",
    user: string = "",
    day: number = 0,
    month: number = 0,
    hour: number = 0,
  ) {
    this._id = _id;
    this.profesional = profesional;
    this.service = service;
    this.user = user;
    this.day = day;
    this.month = month;
    this.hour = hour;
  }
}