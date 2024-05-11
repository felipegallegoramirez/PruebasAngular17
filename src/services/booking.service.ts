import { Injectable } from "@angular/core";
import { HttpClient  } from "@angular/common/http";
import { Booking } from "../models/booking";
import { environment } from "../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  selectedBooking: Booking;
  bookings: Booking[] = [];
  
  readonly URL_API = environment.backend+"api/booking";


  constructor(private http: HttpClient) {
    this.selectedBooking = new Booking();
  }

  postBooking(booking: Booking) {
    return this.http.post<Booking>(this.URL_API, booking);
  }

  getBookings() {
    return this.http.get<Booking[]>(this.URL_API);
  }

  getBookingDay(day:number,month:number,service:string,profesional:string) {
    return this.http.get<any>(this.URL_API + `/reserve/${day}/${month}/${service}/${profesional}`);
  }

  getBookingDayPersonal(day:number,month:number,me:string) {
    return this.http.get<any>(this.URL_API + `/personal/${day}/${month}/${me}`);
  }

  getBooking(id:string) {
    return this.http.get<Booking>(this.URL_API + `/one/${id}` );
  }

  putBooking(booking: Booking,id:string) {
    return this.http.put(this.URL_API + `/${id}`,booking );
  }

  deleteBooking(id: string) {
    return this.http.delete(this.URL_API + `/${id}` );
  }
}
