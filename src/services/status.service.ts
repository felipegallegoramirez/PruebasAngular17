import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private apiUrl = environment.backend+'api/status'
  
  constructor(private http: HttpClient) { }

  get(){
    return this.http.get<any>(this.apiUrl + "/",);
  }
}
