import { Component,OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Person } from '../../models/survey';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environments';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent implements OnInit {
  
  constructor(private userService: UserService,
    private noti: MatSnackBar){}

  ngOnInit(): void {
      this.authSession();
  }

  formSendCode = new FormGroup({
    email: new FormControl('', [Validators.required])
  })

   /**funcion para detectar si esta logeado */
   authSession():void{
    let x = localStorage.getItem('User');

    if(x != null){
      window.location.replace(environment.baseUrl+'Home')
    }
  }
  /**  fin función */

  sendCode(){
    let _id = "";
    let name = "";
    let email = this.formSendCode.value.email || "";
    let password = "";
    let rol = "";
    let files_id:string[] = [];
    let post_id:string[] = [];
    let bloq:Array<any> = [{
      day:Array<number>,
    }];
    let services:string[] = [];
    let booking:string[] = [];
    let code= "";
    let active = true;
    let description = "";
    let category = "";
    let locate = "";
    let link = "";
    let followers:string[]  = [];
    let follows: Person[] = [];

    const user: User = {
      _id: _id,
        name: name,
        email: email,
        rol: rol,
        password: password,
        files_id: files_id,
        post_id: post_id,
        bloq: bloq,
        services: services,
        booking: booking,
        code: code,
        active: active,
        description: description,
        category: category,
        locate: locate,
        followers: followers,
        follows: follows,
        link: link,
    }

    this.userService.SendCode(email).subscribe(res => {
      this.noti.open('Te llegara un correo con un enlace para cambiar tu contraseña al correo electronico que escribiste', 'Cerrar', {
        panelClass: ["custom-snackbar1"],
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000
      });
    }, err => {
      this.noti.open('Este correo no existe en PoliNet, crea una cuenta', 'Cerrar', {
        panelClass: ["custom-snackbar"],
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000
      });
    })
  }
}
