import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';
import { User, userLogin } from '../../models/user';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Person } from '../../models/survey';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environments';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.css'
})
export class LoginRegisterComponent implements OnInit, AfterViewInit {

  constructor(private noti: MatSnackBar, 
    private elementRef: ElementRef, 
    private loginService: LoginService, 
    private userService: UserService) {

  }

  ngOnInit(): void {
    this.authSession();
  }

  /** función para verificar si tiene caracter especial o mayuscula*/

  ValPassword(password:string): boolean{
    const mayus: RegExp = /[A-Z]/;
    const specialCaracters: RegExp = /[@_!#$%^&*()<>?/\|}{~:]/;
    const number: RegExp = /[1-9]/;
    // Verificar si hay al menos una mayúscula y un carácter especial
    const hasNumber: boolean = number.test(password);
    const hasMayus: boolean = mayus.test(password);
    const hasSpecialCaracter: boolean = specialCaracters.test(password);
    return hasMayus && hasSpecialCaracter && hasNumber;
  }


  /* Inicio Registro */

  formRegister = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })
  signIn(): void {
    if (this.formRegister.invalid) {

      this.noti.open('Por favor, completa todos los campos obligatorios', 'Cerrar', {
        panelClass: ["custom-snackbar"],
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000
      });
      return;
    }
    let _id = "";
    let name = this.formRegister.value.name || "";
    let email = this.formRegister.value.email || "";
    let password = this.formRegister.value.password;
    let rol = "userRecurrent";
    let files_id: string[] = [];
    let post_id: string[] = [];
    let bloq: Array<any> = [{
      day: Array<number>,
    }];
    let services: string[] = [];
    let booking: string[] = [];
    let code = "";
    let active = false;
    let description = "";
    let category = "";
    let locate = "";
    let link = "";
    let followers: string[] = [];
    let follows: Person[] = [];
    if(password && this.ValPassword(password)){
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
      };

      this.userService.postUser(user).subscribe(res => {
        if (res) {
          this.noti.open('Usuario registrado', 'Cerrar', {
            panelClass: ["custom-snackbar1"],
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 5000
          });
          this.formRegister.reset();
        }
      }, err => {
        this.noti.open('Este correo electronico ya esta en uso', 'Cerrar', {
          panelClass: ["custom-snackbar"],
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000
        });
      })
    }else{
      this.noti.open('La contraseña debera tener un carácter especial, número y una mayuscula', 'Cerrar', {
        panelClass: ["custom-snackbar"],
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000
      });
      return
    }
  }


  /* fin Registro */

  /* Inicio login  */
  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  login(): void {

    if (this.formLogin.invalid) {
      this.noti.open('Por favor, completa todos los campos obligatorios', 'Cerrar', {
        panelClass: ["custom-snackbar"],
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000
      });
      return;
    }
    
    let email = this.formLogin.value.email || "";
    let password = this.formLogin.value.password || "";

    const user: userLogin = {
      email: email,
      password: password
    };

    this.loginService.auth(user).subscribe(res => {
      let userTemporal = res as userLogin;
      if (userTemporal) {
        localStorage.setItem('User', JSON.stringify(userTemporal));
        window.location.replace(environment.baseUrl+'Home')
      }
      this.formLogin.reset();
    }, err => {
      this.noti.open('Error autenticando', 'Cerrar', {
        panelClass: ["custom-snackbar"],
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000
      });
    });

  }


  /*  Fin login  */

  /* Verificar si hay una sesión activa */

  authSession(): void {
    let x = localStorage.getItem('User');

    if (x != null) {
      window.location.replace(environment.baseUrl+'Home')
    }
  }

  /* Fin función */

  /*  Efecto de inicio de sesión */
  ngAfterViewInit() {
    const container = this.elementRef.nativeElement.querySelector('#container');
    const registerBtn = this.elementRef.nativeElement.querySelector('#register');
    const loginBtn = this.elementRef.nativeElement.querySelector('#login');

    registerBtn.addEventListener('click', () => {
      container.classList.add("active");
    });

    loginBtn.addEventListener('click', () => {
      container.classList.remove("active");
    });
  }

}
/* Fin animación */