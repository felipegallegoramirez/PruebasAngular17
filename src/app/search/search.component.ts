import { Component, OnInit } from '@angular/core';
 
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { environment } from '../../environments/environments';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

    users:User[] = [];

  constructor(private userService: UserService){

  }

  ngOnInit(): void {
    this.authSession();
    this.getUsers();
    this.search()
  }
  /** Traer todos los usarios */
  getUsers(){
    this.userService.getSearchUser().subscribe((res) => {
      if(res){
        this.users = res as User[]
        this.users.reverse();
      }else{
        window.alert("No se ha podido traer ningún usuario")
      }
    })
  }
  /** fin función */
    
   /**funcion para detectar si esta logeado */
   authSession():void{
    let x = localStorage.getItem('User');

    if(x == null){
      window.location.replace(environment.baseUrl+'Login')
    }
  }
  /**  fin función */
  /** Funcion para hacer las busquedas */
 
  search(){
    document.addEventListener("keyup", (e: KeyboardEvent) => {
      console.log(e)
      if((e.target as HTMLElement).matches("#Searching")){
        console.log("Match")
        if(e.key === "Escape")(e.target as HTMLInputElement).value = "";
        document.querySelectorAll(".ContainerProfile").forEach((user: Element) => {
          console.log(user)
          if(user.textContent!.toLowerCase().includes((e.target as HTMLInputElement).value.toLowerCase())){
            user.classList.remove("filter") 
          }else{
            user.classList.add("filter")
          }
        })
      }
    })
  }
  /** fin funcion */

}
