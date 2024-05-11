import { Injectable } from '@angular/core';
import { Request } from '../models/request';
import { HttpClient } from '@angular/common/http';
import { environment } from "../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private apiUrl = environment.backend+'api/request'

  constructor(private http: HttpClient) { }

  postRequest(request:Request){
    return this.http.post<boolean>(this.apiUrl + "/", request);
  }

  getRequests(){
    return this.http.get<Request[]>(this.apiUrl + "/");
  }

  getRequestValid(iduser: String){
    return this.http.get<Boolean>( this.apiUrl + `/requestvalid/${iduser}`)
  }

  getRequest(id:String){
    return this.http.get<Request>(this.apiUrl + `/${id}`);
  }

  deleteRequest(id:String){
    return this.http.delete<Request>(this.apiUrl + `/${id}`)
  }

}
