import { Component, OnInit } from '@angular/core';
import { Service } from '../../../models/service';
import { ServiceService } from '../../../services/service.service';
 
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environments';

@Component({
  selector: 'app-services',
   
   
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  constructor(private serviceService:ServiceService,
    private noti: MatSnackBar) { }

  services:Array<Service>=[]
  selected:string=""

  ngOnInit(): void {
    this.authSession()
    this.serviceService.getServices().subscribe(res=>{
      this.services=res as Service[]
      this.cargar();
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
    this.selected=this.services[x]._id||""
    let old=document.getElementsByClassName("select")[0]
    if(old){
      old.classList.remove("select");
    }
    let n = document.getElementsByClassName("card_service")[x]
    n.classList.add("select")
  }

  next(){
    if(this.selected!=""&& this.selected){
      let x= this.services.find(x=>x._id==this.selected)
      this.preview.service.push({
        title:x?.name||"",
        price:x?.price+""||""
      })
      this.preview.total=x?.price+""||""
      localStorage.setItem("preview",JSON.stringify(this.preview))
      localStorage.setItem("service_id",this.selected)
      window.location.replace("http://localhost:4200/Profesional");
    }else{
        this.noti.open('Por favor, seleccione un servicio', 'Cerrar', {
          panelClass: ["custom-snackbar"],
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000
        });
        return;
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
      localStorage.setItem("preview",JSON.stringify(this.preview))

  }




}
