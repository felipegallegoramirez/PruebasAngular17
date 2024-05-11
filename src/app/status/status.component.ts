import { Component, OnInit } from '@angular/core';
import { StatusService } from '../../services/status.service';


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrl: './status.component.css'
})
export class StatusComponent implements OnInit {
  stat:string='Desconocido'
  time:number=0
  constructor(private status: StatusService){
    

  }

  ngOnInit(): void {
    const start = new Date();
    var element = document.getElementById("status");
    this.status.get().subscribe(res=>{
      this.stat='Activo'
      if(element){
        element.classList.remove("unknow");
        element.classList.add("active");
      }
      const end = new Date();
    this.time=end.getTime() - start.getTime();

    },err=>{
      this.stat='Error'
      if(element){
      element.classList.remove("unknow");
      element.classList.add("fall");
      }
      const end = new Date();
      this.time=end.getTime() - start.getTime();
    })
  }

}
