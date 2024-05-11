 
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environments';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
})
export class ConfirmComponent implements OnInit {

  constructor(private noti: MatSnackBar) { }

  ngOnInit(): void {
    this.authSession()
    this.cargar()
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

  confirm(){
    this.noti.open('Has registrado un servicio a las '+this.preview.hora+' el día '+this.preview.dia+' de '+this.preview.mes+ ' Seras redireccionado a la pagina de servicios', 'Cerrar', {
      panelClass: ["custom-snackbar1"],
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 5000
    });
    setTimeout(() => {
      window.location.replace(environment.baseUrl+'Services')
    }, 3000)
    
  }

   /**funcion para detectar si esta logeado */
   authSession():void{
    let x = localStorage.getItem('User');

    if(x == null){
      window.location.replace(environment.baseUrl+'Login')
    }
  }
  /**  fin función */

}
