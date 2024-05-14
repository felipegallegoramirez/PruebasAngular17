import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environments';
import { StatusService } from '../services/status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'PoliNet';
  idUser: String = "";
  contador: number = 0;
  rol: String = "";
  stat: string = 'Desconocido'
  time: number = 0

  constructor(private status: StatusService) {

  }

  ngOnInit(): void {
    this.HideButton();
    this.closeSession();
    this.authUser();
    this.navbarHide();
    this.CheckUsers();
    this.modalStatus()
  }

  modalStatus(){
    const start = new Date();
    var element = document.getElementById("status");
    let modal = document.getElementById('modalView');
    modal?.classList.add('vistoM')
    this.status.get().subscribe(res => {
      if (element) {
        this.stat = 'Activo'
        modal?.classList.remove('vistoM')
        element.classList.remove("unknow");
        element.classList.add("active");
      }
      const end = new Date();
      this.time=end.getTime() - start.getTime();
    }, err => {
      if (element) {
        this.stat = 'Error'
        element.classList.remove("unknow");
        element.classList.add("fall");
      }
      const end = new Date();
      this.time=end.getTime() - start.getTime();
    })
  }

  navbarHide() {
    let box = document.getElementById('SideBar');
    let x = localStorage.getItem('User')
    if (x == null) {
      box!.style.display = 'none'
    }
  }



  CheckUsers() {
    let buttonHour = document.getElementById('button3-hour');
    let buttonCalendar = document.getElementById('button4-calendar');
    let buttonMeetings = document.getElementById('button2-meetings');
    let linkPub = document.getElementById('LinkPub');
    let linkPriv = document.getElementById('LinkPriv');

    let x = localStorage.getItem('User');

    if (x != null) {
      let UserLocalStorage = JSON.parse(x);
      this.rol = UserLocalStorage.rol;

      switch (this.rol) {
        case "userRecurrent":
          buttonMeetings!.style.display = 'none';
          buttonCalendar!.style.display = 'none';
          buttonHour!.style.display = 'none';
          break;
        case "enterprise":
          buttonHour!.style.display = 'none'
          buttonCalendar!.style.display = 'flex';
          buttonMeetings!.style.display = 'flex';
          break;
        case "teacher":
          buttonHour!.style.display = 'flex';
          buttonCalendar!.style.display = 'flex';
          buttonMeetings!.style.display = 'none';
          break;
        case "Admon":
          linkPub!.style.display = 'none';
          linkPriv!.style.display = 'flex';
          break;
      }
    }
  }

  /** Función para visitar perfil con localstorage */
  authUser() {
    let x = localStorage.getItem("User");

    if (x != null) {
      let User = JSON.parse(x);
      this.idUser = User.id;
    }
  }
  /** Fin función */


  CloseSideBar() {
    let box = document.getElementById('SideBar');
    let words = document.getElementsByClassName('LinksWord') as HTMLCollectionOf<HTMLElement>;
    let Arrow = document.getElementById('Arrow');

    if (this.contador == 0) {

      for (let i = 0; i < words.length; i++) {
        words[i].style.color = 'var(--sw)';
      }
      Arrow!.style.transform = 'rotate(180deg)';
      box!.style.transform = 'translate(-150px)';
      this.contador++;
    } else {
      for (let i = 0; i < words.length; i++) {
        words[i].style.color = 'var(--b)';
        words[i].style.transition = 'color .2s linear';
      }
      box!.style.transform = "translate(0px)";
      Arrow!.style.transform = 'rotate(0deg)';
      this.contador--;
    }
  }

  HideButton() {
    let x = localStorage.getItem('User');
    let ButtonLogIn = document.getElementById('Log-in');
    let ButtonSignOut = document.getElementById('Sign-out');
    if (x != null) {
      ButtonLogIn!.style.display = "none";
      ButtonSignOut!.style.display = "block";
    }
  }
  closeSession() {
    let ButtonSignOut = document.getElementById('Sign-out');
    ButtonSignOut?.addEventListener('click', () => {
      localStorage.removeItem('User')
      this.navbarHide();
      window.location.replace(environment.baseUrl + 'Login')

    })
  }


}
