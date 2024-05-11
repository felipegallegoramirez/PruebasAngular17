import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from '../../environments/environments';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrl: './recovery-password.component.css'
})
export class RecoveryPasswordComponent implements OnInit {

  codeSession: string = "";
  idSession: string = "";
  getUser: User = new User();

  constructor(private noti: MatSnackBar,
    private userService: UserService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.authSession();
    this.activatedRoute.params.subscribe(params => {
      this.idSession = params['id'];
      this.codeSession = params['code'];

      this.userService.getUser(this.idSession).subscribe((res) => {
        this.getUser = res as User;
      })
    })

  }

   /**funcion para detectar si esta logeado */
   authSession():void{
    let x = localStorage.getItem('User');

    if(x != null){
      window.location.replace(environment.baseUrl+'Home')
    }
  }
  /**  fin función */


  ValPassword(password: string): boolean {
    const mayus: RegExp = /[A-Z]/;
    const specialCaracters: RegExp = /[@_!#$%^&*()<>?/\|}{~:]/;
    const number: RegExp = /[1-9]/;
    // Verificar si hay al menos una mayúscula y un carácter especial
    const hasNumber: boolean = number.test(password);
    const hasMayus: boolean = mayus.test(password);
    const hasSpecialCaracter: boolean = specialCaracters.test(password);
    return hasMayus && hasSpecialCaracter && hasNumber;
  }



  /** función para cambiar la contraseña */

  formPutPassword = new FormGroup({
    password: new FormControl('', [Validators.required]),
    repassword: new FormControl('', [Validators.required])
  })

  putPassword() {

    let password = this.formPutPassword.value.password || "";
    if (this.formPutPassword.invalid) {
      this.noti.open('Debe de completar los campos', 'Cerrar', {
        panelClass: ["custom-snackbar"],
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000
      });
    } else {
      if (password == this.formPutPassword.value.repassword) {
        if (this.ValPassword(password)) {
          let user = new User("", "", this.getUser.email, password, "", [], [], [], [], [],
            this.codeSession, false, "", "", "", "", [], [])
  
          this.userService.putPassword(this.idSession, user).subscribe((res) => {
            if (res) {
              this.noti.open('Se ha cambiado la contraseña con exito', 'Cerrar', {
                panelClass: ["custom-snackbar1"],
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
                duration: 5000
              });
  
              window.location.replace("http://localhost:4200/Login")
            }
          }, (err) => {
            this.noti.open('Ha ocurrido un error', 'Cerrar', {
              panelClass: ["custom-snackbar"],
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              duration: 5000
            });
          })
        } else {
          this.noti.open('La contraseña debe de tener por lo menos una mayuscula, un número y un carácter especial', 'Cerrar', {
            panelClass: ["custom-snackbar"],
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 5000
          });
        }
      }else{
        this.noti.open('La contraseñas deben de ser iguales en los dos campos', 'Cerrar', {
          panelClass: ["custom-snackbar"],
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000
        });
      }
    }
  }
  /** fin función */
}
