import { Component, OnInit } from '@angular/core';
import { Survey } from '../../models/survey';
import { SurveyService } from '../../services/survey.service';
import { MatSnackBar} from '@angular/material/snack-bar';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environments';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.css'
})
export class SurveyComponent implements OnInit {
  _idUser: string = "";
  nameUser: string = "";
  rolUser: string = "";

  constructor( private surveyService: SurveyService, private matSnackBar: MatSnackBar, private activatedRoute: ActivatedRoute){  }

  id:string=''
  survey:Survey=new Survey()
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.surveyService.getSurvey(this.id).subscribe(res=>{
        this.survey=res as Survey
        var fechaActual = new Date();
        var hora = fechaActual.getHours();
        var dia = fechaActual.getDate();
        var mes = fechaActual.getMonth()
        if(this.survey.state==true){
          window.location.replace(environment.baseUrl+'Home')
        }else if(mes<Number(this.survey.month)){
          window.location.replace(environment.baseUrl+'Home')
        }else if(mes==Number(this.survey.month)&&dia<Number(this.survey.day)){
          window.location.replace(environment.baseUrl+'Home')
        }else if(mes==Number(this.survey.month)&&dia==Number(this.survey.day)&&hora<Number(this.survey.hour)){
          window.location.replace(environment.baseUrl+'Home')
        }else{
          this.checkLocalStorage();
          this.authSession();
          this.checkUser();
        }

      })
    })
  }
  

  /**funcion get LocalStorage */

  checkLocalStorage() {
    let x = localStorage.getItem('User');

    if (x != null) {
      let UserLocalStorage = JSON.parse(x);
      this.rolUser = UserLocalStorage.rol;
      this._idUser = UserLocalStorage.id;
      this.nameUser = UserLocalStorage.name;

    }
  }

  /** fin funcion */


  /** función para enviar formulario de encuesta de emprendedor a mentor*/

  formSurveyEnterprisetoTeacher = new FormGroup({
    description0: new FormControl('', [Validators.required]),
    description1: new FormControl('', [Validators.required]),
    description2: new FormControl('', [Validators.required]),
    description3: new FormControl('', [Validators.required]),
    description4: new FormControl('', [Validators.required]),
  })

  sendFormSurveyEtoT(){

    if (this.formSurveyEnterprisetoTeacher.invalid) {
      
      this.matSnackBar.open('Por favor, completa todos los campos obligatorios', 'Cerrar', {
        panelClass: ["custom-snackbar"],
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000 
      });
      return; 
    }
    let answer: string[] = [];
    let rating = 0;

    answer.push(this.formSurveyEnterprisetoTeacher.value.description0 || "")
    answer.push(this.formSurveyEnterprisetoTeacher.value.description1 || "")
    answer.push(this.formSurveyEnterprisetoTeacher.value.description2 || "")
    answer.push(this.formSurveyEnterprisetoTeacher.value.description3 || "")
    answer.push(this.formSurveyEnterprisetoTeacher.value.description4 || "")

    this.survey.answers=answer
    this.survey.rating=rating
    this.survey.state=true

    this.surveyService.putSurvey(this.id,this.survey).subscribe((res) => {
      if(res){
        window.alert('Encuesta enviada')
        window.location.replace(environment.baseUrl+'Home')
      }
    })
  }


  /**  fin función */

  /** función para enviar formulario de encuesta de mentor a emprendedor*/

  formSurveyTeachertoEnterprise = new FormGroup({
    description0: new FormControl('', [Validators.required]),
    description1: new FormControl('', [Validators.required]),
    description2: new FormControl('', [Validators.required]),
    description3: new FormControl('', [Validators.required]),
    description4: new FormControl('', [Validators.required]),
  })

  sendFormSurveyTtoE() {
    if (this.formSurveyEnterprisetoTeacher.invalid) {
      
      this.matSnackBar.open('Por favor, completa todos los campos obligatorios', 'Cerrar', {
        panelClass: ["custom-snackbar"],
      //  horizontalPosition: this.horizontalPositionSnack,
        //verticalPosition: this.verticalPositionSnack,
        duration: 5000 
      });
      return; 
    }
    let answer: string[] = [];
    let rating = 0;

    answer.push(this.formSurveyTeachertoEnterprise.value.description0 || "")
    answer.push(this.formSurveyTeachertoEnterprise.value.description1 || "")
    answer.push(this.formSurveyTeachertoEnterprise.value.description2 || "")
    answer.push(this.formSurveyTeachertoEnterprise.value.description3 || "")
    answer.push(this.formSurveyTeachertoEnterprise.value.description4 || "")

    this.survey.answers=answer
    this.survey.rating=rating
    this.survey.state=true

    this.surveyService.putSurvey(this.id,this.survey).subscribe((res) => {
      if(res){
        window.alert('Encuesta enviada')
        window.location.replace(environment.baseUrl+'Home')
      }
    })
  }
  /**  fin función */


   /**funcion para detectar si esta logeado */
   authSession():void{
    let x = localStorage.getItem('User');

    if(x == null){
      window.location.replace(environment.baseUrl+'Login')
    }
  }
  /**  fin función */

  /** Funcion para detectar el rol */
  checkUser() {
    let enterprise = document.getElementById('enterprise');
    let teacher = document.getElementById('teacher');

    switch (this.rolUser) {
      case "teacher":
        teacher!.style.display = 'block';
        break;
      case "enterprise":
        enterprise!.style.display = 'block';
        break;
    }
  }
  /** fin funcion */
}
