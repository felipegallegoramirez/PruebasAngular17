import { Component, OnInit } from '@angular/core';
import { Request } from '../../models/request';
import { Survey } from '../../models/survey';
import { User } from '../../models/user';
import { RequestService } from '../../services/request.service';
import { SurveyService } from '../../services/survey.service';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environments';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrl: './admin-view.component.css'
})
export class AdminViewComponent implements OnInit {

  requests:Request[] = [];
  surveys: Survey[] = [];
  users: User[] = [];
  userSelected: User = new User(); 
  surveySelected: Survey = new Survey();
  requestSelected: Request = new Request();
  requestUserSelected: User = new User();
  userLogged: User = new User();
  idsession: string = "";
  teacherCase: string = 'Mentor a Emprendedor';
  enterpriseCase: string = 'Emprendedor a mentor';
  contadorMostrar: number = 0;

  constructor(private noti: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private requestService:RequestService,
    private surveyService: SurveyService,
    private userService: UserService){}

  ngOnInit(){
      this.getRequests();
      this.getSurveys();
      this.getUsers();
      this.getUserLogged();
      this.authSession();
  }
  /*-----------------función para traer el administrador logeado-------------------- */

  getUserLogged(){
    this.activatedRoute.params.subscribe(params => {
      this.idsession = params['id']

      this.userService.getUser(this.idsession).subscribe(res => {
        this.userLogged = res as User
      })
    })
  }

  /* ngif */

  Hide(visible:number){
    this.contadorMostrar = visible;
  }

  /*-----------------funciones de las encuestas------------------*/
  getSurveys(){
    this.surveyService.getSurveys().subscribe(res => {
      this.surveys = res as Survey[]
    })
  }

  ModalOpenSurvey(modalId:String, surveyId:string): void{
    let modals = document.querySelectorAll(`#${modalId}`) as NodeListOf<HTMLDivElement>;
    this.surveyService.getSurvey(surveyId).subscribe(res => {
      this.surveySelected = res as Survey
      this.noti.open('Encuesta cargada correctamente', 'Cerrar', {
        panelClass: ["custom-snackbar1"],
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000
      });
    }, err => {
      this.noti.open('Error en el cargado de la información', 'Cerrar', {
        panelClass: ["custom-snackbar1"],
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000
      });
    })
    modals.forEach(modalId => {
      modalId!.classList.add('visto');
    });
  }

  /*--------------------fin función------------------------- */

/*--------------------funciones sobre postulaciones de usarios--------------------------------------*/
  getRequests(){
    this.requestService.getRequests().subscribe(res => {
      this.requests = res as Request[];
    })
  }

  ModalAcceptRequest(modalId:String, requestId:string): void{
    let modals = document.querySelectorAll(`#${modalId}`) as NodeListOf<HTMLDivElement>;
    this.requestService.getRequest(requestId).subscribe(res => {
      this.requestSelected = res as Request
      this.userService.getUser(this.requestSelected.iduser).subscribe(res => {
        this.requestUserSelected = res as User
        this.noti.open('Se ha cargado la información de '+this.requestUserSelected.name, 'Cerrar', {
          panelClass: ["custom-snackbar1"],
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000
        });
      }, err => {
        this.noti.open('Error en el cargado de la información', 'Cerrar', {
          panelClass: ["custom-snackbar1"],
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000
        });
      })
    }, err => {
      this.noti.open('Error en el cargado de la información', 'Cerrar', {
        panelClass: ["custom-snackbar1"],
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000
      });
    })
    modals.forEach(modalId => {
      modalId!.classList.add('visto');
    });
  }

  acceptRequest(){
    this.userService.putUserteacherRol(this.requestUserSelected._id).subscribe(res => {
      this.requestService.deleteRequest(this.requestSelected._id).subscribe(res => {
        this.noti.open('La petición ha sido aceptada con exito', 'Cerrar', {
          panelClass: ["custom-snackbar1"],
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000
        });
        window.location.reload()
      })
    })
  }

  denyRequest(){
    this.requestService.deleteRequest(this.requestSelected._id).subscribe(res => {
      this.noti.open('La petición ha sido elimanda con exito', 'Cerrar', {
        panelClass: ["custom-snackbar1"],
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000
      });
      window.location.reload()
    }, err => {
      this.noti.open('Ha ocurrido un error', 'Cerrar', {
        panelClass: ["custom-snackbar1"],
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000
      });
      this.ModalClose('ModalViewAccept');
    })
  }
/*--------------------------fin función----------------------------------------*/

/*-------------------------funciones sobre los usuarios------------------------------ */

  getUsers(){
    this.userService.getUsers().subscribe(res => {
      this.users = res as User[]
    })
  }

  deleteUser(){
    for (let i = 0; i < this.userSelected.post_id.length; i++) {
      this.postService.deletePost(this.userSelected.post_id[i]).subscribe(res => {})
    }
    this.userService.deleteUser(this.userSelected._id).subscribe(res => {
      this.noti.open('Usuario y posts eliminado', 'Cerrar', {
        panelClass: ["custom-snackbar1"],
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000
      });
      window.location.reload();
    }, err => {
      this.noti.open('Hubo un error al intentar eliminar al usuario', 'Cerrar', {
        panelClass: ["custom-snackbar"],
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000
      });
    })
  }
  ModalOpenUser(modalId:String, userId:string): void{
    let modals = document.querySelectorAll(`#${modalId}`) as NodeListOf<HTMLDivElement>;
    this.userService.getUser(userId).subscribe(res => {
      this.userSelected = res as User
      this.noti.open('Se ha cargado la información correctamente', 'Cerrar', {
        panelClass: ["custom-snackbar1"],
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000
      });
    }, err => {
      this.noti.open('Error en el cargado de la información', 'Cerrar', {
        panelClass: ["custom-snackbar"],
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000
      });
    })
    modals.forEach(modalId => {
      modalId!.classList.add('visto');
    });
  }
  /*--------------------fin función----------------------- */
  
  
  
  ModalClose(modalId:String): void{
    let modals = document.querySelectorAll(`#${modalId}`) as NodeListOf<HTMLDivElement>;
    modals.forEach(modalId => {
      modalId!.classList.remove('visto');
    });
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

