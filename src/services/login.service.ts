import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { userLogin } from '../models/user';
import { environment } from "../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private apiUrl = environment.backend+'api/auth';


  constructor(private http: HttpClient) { }

  auth(userLogin: userLogin){
    return this.http.post<userLogin>(this.apiUrl + '/', userLogin);
  }

  
}


