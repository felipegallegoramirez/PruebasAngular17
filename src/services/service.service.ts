import { Injectable } from "@angular/core";
import { HttpClient  } from "@angular/common/http";
import { Service } from "../models/service";
import { environment } from "../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  selectedService: Service;
  services: Service[] = [];

  readonly URL_API = environment.backend+"api/service";


  constructor(private http: HttpClient) {
    this.selectedService = new Service();
  }

  postService(service: Service) {
    return this.http.post<Service>(this.URL_API, service);
  }

  getServices() {
    return this.http.get<Service[]>(this.URL_API);
  }

  getService(id:string) {
    return this.http.get<Service>(this.URL_API + `/${id}` );
  }

  putService(service: Service,id:string) {
    return this.http.put(this.URL_API + `/${id}`,service );
  }

  deleteService(id: string) {
    return this.http.delete(this.URL_API + `/${id}` );
  }
}
