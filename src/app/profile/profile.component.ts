import { Component, OnInit } from '@angular/core';

import { FormControl, ReactiveFormsModule, FormGroup, Validator, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { RequestService } from '../../services/request.service';
import { ActivatedRoute } from '@angular/router';
import { Person } from '../../models/survey';
import { Request } from '../../models/request';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environments';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  idLocalStorage: string = "";
  rol: string = "";
  nameLocalStorgae = "";
  idsession: string = "";
  user: User = new User();
  userLogged: User = new User();
  posts: Post[] = [];

  count: number = 0;


  constructor(private noti: MatSnackBar,
    private requestService: RequestService,
    private postService: PostService,
    private userService: UserService,
    private activateRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.authSession();
    this.buttons();
    this.gotoEdit("editProfile");
    this.ocultarSiSinSrc("ImagenLoad");



    let followMeButton = document.getElementById('followMeButton');
    let x = localStorage.getItem('User');

    if (x != null) {
      let UserLocalStorage = JSON.parse(x);
      this.rol = UserLocalStorage.rol;
      this.idLocalStorage = UserLocalStorage.id;
      this.nameLocalStorgae = UserLocalStorage.name;
    }

    /** Pintar perfil */
    this.activateRoute.params.subscribe(params => {
      this.idsession = params['id'];

      this.userService.getUser(this.idsession).subscribe((res) => {
        this.user = res as User;

        this.CheckUsers(this.idsession);
        if (this.user.followers.findIndex(x => this.idLocalStorage == x) != -1) {
          this.count = 1;
          followMeButton!.style.backgroundColor = "var(--r)";
          followMeButton!.innerHTML = "Dejar de seguir";
        }
      });

      this.postService.postsByUser(this.idsession).subscribe((res) => {
        this.posts = res as Post[]
        this.posts.reverse();
      })
    });

    this.userService.getUser(this.idLocalStorage).subscribe((res) => {
      this.userLogged = res as User;
      if (this.userLogged.follows.findIndex(y => this.idLocalStorage == y._id) != -1) {
      }
    })
    /** fin de función */
  }

  /** funcion para cambiar rol */

  formPutRol = new FormGroup({
    emailRol: new FormControl('', [Validators.required])
  })

  putRol() {
    if (this.formPutRol.invalid) {

      this.noti.open('Por favor, completa todos los campos obligatorios', 'Cerrar', {
        panelClass: ["custom-snackbar"],
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000
      });
      return;
    }
    let emailRol = this.formPutRol.value.emailRol || "";

    this.userService.putUserRol(emailRol).subscribe((res) => {
      this.noti.open('Se ha cambiado el rol', 'Cerrar', {
        panelClass: ["custom-snackbar1"],
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000
      });
      this.ModalClose("modalSubEnter")
    }, err => {
      this.noti.open('Ha ocurrido un error', 'Cerrar', {
        panelClass: ["custom-snackbar"],
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000
      });
    })
  }
  /** fin funcion */


  /**funcion para detectar si esta logeado */
  authSession(): void {
    let x = localStorage.getItem('User');

    if (x == null) {
      window.location.replace(environment.baseUrl + 'Login')
    }
  }
  /**  fin función */

  /** función eliminar post */

  formDelete = new FormGroup({
    delete_Id: new FormControl('', [])
  })

  deletePost() {
    let delete_Id = this.formDelete.value.delete_Id || "";

    let _id = this.user._id;
    let name = this.user.name;
    let email = this.user.email;
    let password = this.user.password;
    let rol = this.user.rol;
    let files_id = this.user.files_id;
    let post_id = this.user.post_id;
    let bloq = this.user.bloq;
    let services = this.user.services;
    let booking = this.user.booking;
    let code = this.user.code;
    let active = this.user.active;
    let description = this.user.description;
    let category = this.user.category;
    let locate = this.user.locate;
    let link = this.user.link;
    let followers: string[] = this.user.followers;
    let follows: Person[] = this.user.follows;


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

    let indexID = post_id.indexOf(delete_Id)
    post_id.splice(indexID, 1);
    this.userService.putUser(user, _id).subscribe((res) => {
      this.postService.deletePost(delete_Id).subscribe((res) => {
        if (res) {
          this.noti.open('Has eliminado un post con exito', 'Cerrar', {
            panelClass: ["custom-snackbar1"],
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 5000
          });
          window.location.reload()
        }
      }, err =>{
        this.noti.open('No ha sido posible eliminar el post' , 'Cerrar', {
          panelClass: ["custom-snackbar"],
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000
        });
      })
    })

  }

  /** fin función */

  /* Ocultar las imagenes sin path determinado  */
  ocultarSiSinSrc(idImagen: string): void {
    let imgElements = document.querySelectorAll(`#${idImagen}`) as NodeListOf<HTMLImageElement>;
    imgElements.forEach(imgElement => {
      let url = imgElement.currentSrc;

      if (url === "") {
        imgElement.style.display = "none";
      } else {
        console.log("La imagen tiene una URL válida");
      }
    });
  }
  /* Fin función */

  /* Verificar el tipo de usuario  */
  CheckUsers(idsession: String) {
    let followMeButton = document.getElementById('followMeButton');
    let buttonEnterprisePriv = document.getElementById('EnterprisePriv');
    let buttonEnterprisePub = document.getElementById('EnterprisePub');
    let MentorPriv = document.getElementById('MentorPriv');
    let MentorPub = document.getElementById('MentorPub');
    let UserRecurrent = document.getElementById('UserRecurrent');
    let Advertice = document.getElementById('Advertice');
    let followers = document.getElementById('Followers');
    let extraInfo = document.getElementById('extraInfo');
    UserRecurrent!.style.display = 'none';
    buttonEnterprisePub!.style.display = 'none';
    buttonEnterprisePriv!.style.display = 'none';
    MentorPriv!.style.display = 'none';
    MentorPub!.style.display = 'none';
    followMeButton!.style.display = 'none';

    if (idsession == this.idLocalStorage) {
      switch (this.rol) {
        case "userRecurrent":
          extraInfo!.style.display = 'none';
          Advertice!.style.display = 'flex';
          UserRecurrent!.style.display = 'grid';
          followers!.style.display = 'none';
          break;
        case "enterprise":
          buttonEnterprisePriv!.style.display = 'grid';
          break;
        case "teacher":
          MentorPriv!.style.display = 'grid';
          break;
      }
    } else {
      console.log(this.user.rol)
      switch (this.user.rol) {
        case "userRecurrent":
          followers!.style.display = 'none';
          extraInfo!.style.display = 'none';
          followers!.style.display = 'none';
          break;
        case "teacher":
          followMeButton!.style.display = 'block';
          MentorPub!.style.display = 'grid';
          break;
        case "enterprise":
          buttonEnterprisePub!.style.display = 'grid';
          followMeButton!.style.display = 'block';
          break;
      }
    }
  }
  /** función actualizar followers */

  Follow() {
    let followMeButton = document.getElementById('followMeButton');


    /** atributos de la person que sigue */
    let _idPerson = this.idLocalStorage;

    let _idUserLogged = this.userLogged._id;
    let nameUserLogged = this.userLogged.name;
    let emailUserLogged = this.userLogged.email;
    let passwordUserLogged = this.userLogged.password;
    let rolUserLogged = this.userLogged.rol;
    let files_idUserLogged = this.userLogged.files_id;
    let post_idUserLogged = this.userLogged.post_id;
    let bloqUserLogged = this.userLogged.bloq;
    let servicesUserLogged = this.userLogged.services;
    let bookingUserLogged = this.userLogged.booking;
    let codeUserLogged = this.userLogged.code;
    let activeUserLogged = this.userLogged.active;
    let descriptionUserLogged = this.userLogged.description;
    let categoryUserLogged = this.userLogged.category;
    let locateUserLogged = this.userLogged.locate;
    let linkUserLogged = this.userLogged.link;
    let followersUserLogged: string[] = this.userLogged.followers;
    let followsUserLogged: Person[] = this.userLogged.follows;

    /** fin clase*/
    /** atributos de la persona a la que estas siguiendo */
    let _id = this.user._id;
    let name = this.user.name;
    let email = this.user.email;
    let password = this.user.password;
    let rol = this.user.rol;
    let files_id = this.user.files_id;
    let post_id = this.user.post_id;
    let bloq = this.user.bloq;
    let services = this.user.services;
    let booking = this.user.booking;
    let code = this.user.code;
    let active = this.user.active;
    let description = this.user.description;
    let category = this.user.category;
    let locate = this.user.locate;
    let link = this.user.link;
    let followers: string[] = this.user.followers;
    let follows: Person[] = this.user.follows;

    const person: Person = {
      _id: _id,
      name: name
    }
    /** fin clase  */
    if (this.count == 0) {

      followers.push(_idPerson)

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

      followsUserLogged.push(person)

      const userLogged: User = {
        _id: _idUserLogged,
        name: nameUserLogged,
        email: emailUserLogged,
        rol: rolUserLogged,
        password: passwordUserLogged,
        files_id: files_idUserLogged,
        post_id: post_idUserLogged,
        bloq: bloqUserLogged,
        services: servicesUserLogged,
        booking: bookingUserLogged,
        code: codeUserLogged,
        active: activeUserLogged,
        description: descriptionUserLogged,
        category: categoryUserLogged,
        locate: locateUserLogged,
        followers: followersUserLogged,
        follows: followsUserLogged,
        link: linkUserLogged,
      };

      this.count++

      this.userService.putUser(userLogged, this.idLocalStorage).subscribe((res) => { })
      this.userService.putUser(user, this.idsession).subscribe((res) => { })

      followMeButton!.style.backgroundColor = "var(--r)";
      followMeButton!.innerHTML = "Dejar de seguir";

      this.noti.open('Siguiendo a ' + this.user.name, 'Cerrar', {
        panelClass: ["custom-snackbar1"],
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000
      });
    } else {

      let deleteId = followers.indexOf(_idPerson)
      followers.splice(deleteId, 1);

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

      let deletePersonFollow = followsUserLogged.indexOf(person)
      followsUserLogged.splice(deletePersonFollow, 1)

      const userLogged: User = {
        _id: _idUserLogged,
        name: nameUserLogged,
        email: emailUserLogged,
        rol: rolUserLogged,
        password: passwordUserLogged,
        files_id: files_idUserLogged,
        post_id: post_idUserLogged,
        bloq: bloqUserLogged,
        services: servicesUserLogged,
        booking: bookingUserLogged,
        code: codeUserLogged,
        active: activeUserLogged,
        description: descriptionUserLogged,
        category: categoryUserLogged,
        locate: locateUserLogged,
        followers: followersUserLogged,
        follows: followsUserLogged,
        link: linkUserLogged,
      };


      this.count--

      this.userService.putUser(userLogged, this.idLocalStorage).subscribe((res) => { })
      this.userService.putUser(user, this.idsession).subscribe((res) => { })

      followMeButton!.style.backgroundColor = "var(--c1)";
      followMeButton!.innerHTML = "Seguir";
      this.noti.open('Dejaste de seguir a ' + user.name, 'Cerrar', {
        panelClass: ["custom-snackbar"],
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000
      });

    }
  }
  /**  fin funcion */


  /** función para enviar postulación de Mentor */

  formApply = new FormGroup({
    cellphone: new FormControl("", [Validators.required])
  })

  Apply() {
    let cellphone = this.formApply.value.cellphone?.toString() || "";
    let contador = cellphone.length;
    if (contador != 10) {
      this.noti.open('El número es invalido', 'Cerrar', {
        panelClass: ["custom-snackbar"],
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000
      });
      return
    }

    let requestValid: Boolean = false

    this.requestService.getRequestValid(this.idsession).subscribe(res => {
      requestValid = res

      if (requestValid == false) {


        let cellphone = this.formApply.value.cellphone || "";

        let request = new Request("", this.user._id, this.user.name, cellphone)

        this.requestService.postRequest(request).subscribe(res => {
          this.noti.open('Postulación enviada', 'Cerrar', {
            panelClass: ["custom-snackbar1"],
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 5000
          });
        }, err => {
          this.noti.open('Ese número de telefono ya ha sido registrado', 'Cerrar', {
            panelClass: ["custom-snackbar"],
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 5000

          });
        })
      } else {
        this.noti.open('Ya tienes una postulación enviada', 'Cerrar', {
          panelClass: ["custom-snackbar"],
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000
        });
      }
    })



  }
  /** fin función */
  buttons() {
    let makePost = document.querySelector('#makePost');
    makePost?.addEventListener('click', () => {
      window.location.replace(environment.baseUrl + 'makePost/' + this.idsession)
    })
  }

  ModalOpen(modalId: String): void {
    let modals = document.querySelectorAll(`#${modalId}`) as NodeListOf<HTMLDivElement>;
    modals.forEach(modalId => {
      modalId!.classList.add('visto');
    });
  }
  ModalClose(modalId: String): void {
    let modals = document.querySelectorAll(`#${modalId}`) as NodeListOf<HTMLDivElement>;
    modals.forEach(modalId => {
      modalId!.classList.remove('visto');
    });
  }

  gotoEdit(editProfile: string): void {
    let ButtonEdit = document.querySelectorAll(`#${editProfile}`) as NodeListOf<HTMLButtonElement>;
    ButtonEdit.forEach(editProfile => {
      editProfile?.addEventListener('click', () => {
        window.location.replace(environment.baseUrl + 'editProfile/' + this.idsession)
      })
    })
  }

}
