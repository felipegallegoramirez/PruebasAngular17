import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from "../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.backend+'api/user'
  
  constructor(private http: HttpClient) { }

  postUser(user:User){
    return this.http.post<boolean>(this.apiUrl + "/", user);
  }

  getUser(id:string){
    return this.http.get<User>(this.apiUrl + `/unique/${id}`);
  }

  deleteUser(id:string){
    return this.http.delete(this.apiUrl + `/${id}`)
  }

  getUsers(){
    return this.http.get<User[]>(this.apiUrl + "/")
  }

  getSearchUser(){
    return this.http.get<User[]>(this.apiUrl + '/search/')
  }

  getUserTeacherService(){
    return this.http.get<User[]>(this.apiUrl + '/teacher/')
  }

  putUserRol(email: string){
    return this.http.get(this.apiUrl + `/rol/${email}`)
  }
  putUserteacherRol(id: string){
    return this.http.get(this.apiUrl + `/rolTeacher/${id}`)
  }
  putUser(user: User,id:string) {
    return this.http.put(this.apiUrl + `/editUser/${id}`,user);
  }

  SendCode(email: string){
    return this.http.get(this.apiUrl + `/sendCode/${email}`)
  }

  putProfilePhoto(file: File, id: string){
    const fd = new FormData();

    fd.append('image', file)

    return this.http.put(this.apiUrl + `/updateIMG/${id}`, fd)
  }

  putProfilepdf(file: File, id: string){
    const fd = new FormData();

    fd.append('pdf', file);

    return this.http.put(this.apiUrl + `/updatePDF/${id}`, fd)
  }

  putPassword(id: String, user: User){
    return this.http.put(this.apiUrl + `/putPassword/${id}`, user)
  }
  
}
