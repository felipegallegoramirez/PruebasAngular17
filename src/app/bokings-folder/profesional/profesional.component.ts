import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
 
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environments';

@Component({
  selector: 'app-profesional',
   
   
  templateUrl: './profesional.component.html',
  styleUrls: ['./profesional.component.css'],
})
export class ProfesionalComponent implements OnInit {

  constructor(private userService:UserService,
    private noti: MatSnackBar) { }

  profesionals:Array<User>=[]
  selected:string=""

  ngOnInit(): void {
    this.authSession();
    this.userService.getUserTeacherService().subscribe(res=>{
      this.profesionals=res as User[]
      this.cargar()
    })
    
  }

   /**funcion para detectar si esta logeado */
   authSession():void{
    let x = localStorage.getItem('User');

    if(x == null){
      window.location.replace(environment.baseUrl+'Login')
    }
  }
  /**  fin función */

  select(x:number){
    this.selected=this.profesionals[x]._id||""
    let old=document.getElementsByClassName("select")[0]
    if(old){
      old.classList.remove("select");
    }
    let n = document.getElementsByClassName("card_profesional")[x]
    n.classList.add("select")
  }
  default(){
    this.selected="any"
    let old=document.getElementsByClassName("select")[0]
    if(old){
      old.classList.remove("select");
    }
    let n = document.getElementsByClassName("card_profesional")[0]
    n.classList.add("select")
  }


  next(){
    if(this.selected!=""&& this.selected){
      let x= this.profesionals.find(x=>x._id==this.selected)
      this.preview.profresional=x?.name||""
      localStorage.setItem("Profresional_id",this.selected)
      localStorage.setItem("preview",JSON.stringify(this.preview))
      window.location.replace(environment.baseUrl+"Time");
    }else{
      this.noti.open('Por favor, seleccione un profesional', 'Cerrar', {
        panelClass: ["custom-snackbar"],
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000
      });
    }
  }

  preview:{
    semana:string,
    dia:string,
    mes:string,
    hora:string
    service:Array<{
      title:string,
      price:string
    }>,
    profresional:string,
    total:string
  }={
    semana:"Sin seleccionar",
    dia:"",
    mes:"",
    profresional:"",
    hora:"Sin seleccionar",
    service:[],
    total:"0",
  }

  cargar(){
    let x = localStorage.getItem("preview")
    if(x){
      this.preview=JSON.parse(x);
    }else{
      localStorage.setItem("preview",JSON.stringify(this.preview))
    }
  }

}
