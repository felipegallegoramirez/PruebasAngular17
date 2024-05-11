import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
 
import { environment } from '../../../environments/environments';

@Component({
  selector: 'app-admon-time',
   
   
  templateUrl: './admon-time.component.html',
  styleUrls: ['./admon-time.component.css'],
})
export class AdmonTimeComponent implements OnInit {
  data: Array<{
    i: number;
    dia2: string;
    hora: Array<{
      i: number;
      hour: number;
      state: boolean;
    }>;
  }> = [];
  mes: string = '';
  hours: Array<{
    i: number;
    hour: number;
    state: boolean;
  }> = [];

  user:User=new User()
  user_id:string=""
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.authSession();
    let x = localStorage.getItem('User');
    this.user_id = ''
    if (x != null) {
      let UserLocalStorage = JSON.parse(x);
      this.user_id = UserLocalStorage.id;
    }

    var fecha = new Date();
    var hora = fecha.getHours();

    var tempdaytext = fecha.getDay();
    var tempdaynumber = fecha.getDate();
    var tempmonth = fecha.getMonth();
    var tempdiference = this.diference();
    if (hora < 5) {
      hora = 5;
    }

    tempdaytext = 0;
    for (var i = 0; i <= 6; i++) {
      tempdiference -= 1;
      if (tempdiference < 0) {
        tempdaynumber = 1;
        tempmonth += 1;
        tempdiference = 30;
      } else {
        tempdaynumber += 1;
      }


      if (tempdaytext > 6) {
        tempdaytext = 0;
      }
      var temphour = [];
      temphour = [
        { i: 0, hour: 5, state: false },
        { i: 1, hour: 6, state: false },
        { i: 2, hour: 7, state: false },
        { i: 3, hour: 8, state: false },
        { i: 4, hour: 9, state: false },
        { i: 5, hour: 10, state: false },
        { i: 6, hour: 11, state: false },
        { i: 7, hour: 12, state: false },
        { i: 8, hour: 13, state: false },
        { i: 9, hour: 14, state: false },
        { i: 10, hour: 15, state: false },
        { i: 11, hour: 16, state: false },
        { i: 12, hour: 17, state: false },
        { i: 13, hour: 18, state: false },
        { i: 14, hour: 19, state: false },
        { i: 15, hour: 20, state: false },
        { i: 16, hour: 21, state: false },
        { i: 17, hour: 22, state: false },
      ];

      this.data.push({
        i: i,
        dia2: this.day(tempdaytext),
        hora: temphour,
      });
      tempdaytext += 1;
    }

    this.userService.getUser(this.user_id).subscribe(res=>{
      this.user=res as User;

      for(var i=0;i<7;i++){
        if(!this.user.bloq[i]){
          this.user.bloq[i]={day:[]}
        }
        for(var r=0;r<this.user.bloq[i].day.length;r++){
          let ub=this.data[i].hora.findIndex(x=>x.hour==this.user.bloq[i].day[r])
          this.data[i].hora[ub].state=true
        }
      }
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

  diference(): number {
    var fecha = new Date();
    var añoActual = fecha.getFullYear();
    var mesActual = fecha.getMonth();
    var diasEnMesActual = new Date(añoActual, mesActual + 1, 0).getDate();
    var diaActual = fecha.getDate();
    var diasRestantes = diasEnMesActual - diaActual;
    return diasRestantes;
  }

  day(x: number): string {
    switch (x) {
      case 0:
        return 'Dom';
        break;
      case 1:
        return 'Lun';
        break;
      case 2:
        return 'Mar';
        break;
      case 3:
        return 'Mié';
        break;
      case 4:
        return 'Jue';
        break;
      case 5:
        return 'Vie';
        break;
      case 6:
        return 'Sáb';
        break;
      default:
        return 'XXX';
    }
  }

  actday:number=0;

  change(x: number) {
    let y = this.data[x];
    this.actday=x
    this.hours = [];
    this.hours = y.hora;

    let old = document.getElementsByClassName('select_day')[0];
    if (old) {
      old.classList.remove('select_day');
    }

    let n = document.getElementsByClassName('days__day')[y.i];
    n.classList.add('select_day');
    this.cargeConfig();
  }

  configHour(x: number) {
    let element = document.getElementsByClassName('hours_card')[x];
    if (element.classList.contains('negative')) {
      element.classList.remove('negative');
      element.classList.add('afirmative');
    } else {
      element.classList.add('negative');
      element.classList.remove('afirmative');
    }

    this.hours[x].state = !this.hours[x].state;
    if(this.user.bloq[this.actday]){
      let ub=this.user.bloq[this.actday].day.indexOf(this.hours[x].hour)
      if(ub!=-1){
        this.user.bloq[this.actday].day.splice(ub,1)
      }else{
        this.user.bloq[this.actday].day.push(this.hours[x].hour)
      }
    }else{
      this.user.bloq[this.actday].day.push(this.hours[x].hour)
    }


    
  }

  cargeConfig() {
    setTimeout(() => {
      var elements = document.getElementsByClassName('hours_card');
      for (var i = 0; i <= 17; i++) {
        let element = elements[i];
        element.classList.toggle('negative', this.hours[i].state);
        element.classList.toggle('afirmative', !this.hours[i].state);
      }
    }, 0);
  }


  save(){
    this.userService.putUser(this.user,this.user_id).subscribe(res=>{
      alert("Actualizado")
    })
  }






}
