import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../services/booking.service';
 
import { environment } from '../../../environments/environments';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor(private bookingService:BookingService) { }

  

  data:Array<{
    i:number,
    dia:number,
    mes:number,
    dia2:string,
    dia3:number,
  }> =[]
  mes:string=""
  hours:Array<number> =[]

  ngOnInit(): void {
    this.authSession();
    var fecha = new Date();

    var tempdaytext=fecha.getDay();
    var tempdaynumber=fecha.getDate();
    var tempmonth=fecha.getMonth();
    var tempdiference=this.diference()
    var temphour=[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
    this.hours=temphour




    for(var i=0;i<=15;i++){
      this.data.push({
        i:i,
        dia:tempdaynumber,
        mes:tempmonth,
        dia2:this.day(tempdaytext),
        dia3:tempdaytext
      })

      tempdiference-=1
      if(tempdiference<0){
        tempdaynumber=1
        tempmonth+=1
        tempdiference=30
      }else{
        tempdaynumber+=1
      }

      tempdaytext+=1
      if(tempdaytext>6){
        tempdaytext=0
      }
    }
    this.cargar(0)
  }

  diference(): number{
    var fecha = new Date();
    var añoActual = fecha.getFullYear();
    var mesActual = fecha.getMonth();
    var diasEnMesActual = new Date(añoActual, mesActual + 1, 0).getDate();
    var diaActual = fecha.getDate();
    var diasRestantes = diasEnMesActual - diaActual;
  return diasRestantes
}

day(x:number):string{
  switch (x) {
    case 0:
      return  'Dom';
      break;
    case 1:
      return  'Lun';
      break;
    case 2:
      return  'Mar';
      break;
    case 3:
      return  'Mié';
      break;
    case 4:
      return  'Jue';
      break;
    case 5:
      return 'Vie';
      break;
    case 6:
      return  'Sáb';
      break;
    default:
      return  'XXX';
  }
}

cargar(x:number){
  if(x< this.data.length){
    let da = localStorage.getItem('User');
    let id = ''
    if (da != null) {
      let UserLocalStorage = JSON.parse(da);
      id = UserLocalStorage.id;
    }

    this.bookingService.getBookingDayPersonal(this.data[x].dia,this.data[x].mes,id).subscribe(res=>{
      let response=res as Array<{id:string,hour:number}>
      let cant=this.hours.length
      console.log(response)
      for(let i=0;i<response.length;i++){
        let index=this.hours.indexOf(response[i].hour)
        let obj= document.getElementsByClassName("calendar__hour")
        let pos= cant*x+index
        obj[pos].classList.add("ocupado")
      }
      this.cargar(x+1)
    })
  }
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
