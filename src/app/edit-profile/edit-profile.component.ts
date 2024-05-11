import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Person } from '../../models/survey';
import { environment } from '../../environments/environments';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {
  rol = "";
  idLocalStorage = "";
  idsession: string = "";
  userGets: User = new User();

  constructor(private activateRoute: ActivatedRoute, private userService: UserService) {

  }

  ngOnInit(): void {
    this.CheckUsers();
    this.authSession();
    this.activateRoute.params.subscribe(params => {
      this.idsession = params['id'];

      this.userService.getUser(this.idsession).subscribe((res) => {
        this.userGets = res as User
        this.formUpdate.get('description')?.patchValue(this.userGets.description || "");
        this.formUpdate.get('category')?.patchValue(this.userGets.category || "");
        this.formUpdate.get('locate')?.patchValue(this.userGets.locate || "");
        this.formUpdate.get('link')?.patchValue(this.userGets.link || "");
      });
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

  /** función para actualizar datos */
  formUpdate = new FormGroup({
    filePhotoProfile: new FormControl('', []),
    description: new FormControl('', []),
    filePdf: new FormControl('', []),
    category: new FormControl('', []),
    locate: new FormControl('', []),
    link: new FormControl('', []),
  });

  update(): void {

    let _id = this.userGets._id;
    let name = this.userGets.name;
    let email = this.userGets.email;
    let password = this.userGets.password;
    let rol = this.userGets.rol;
    let filePhotoProfile = <HTMLInputElement> document.getElementById("foto");
    let filePdf = <HTMLInputElement> document.getElementById('pdf');
    let description = this.formUpdate.value.description || "";
    let category = this.formUpdate.value.category || "";
    let locate = this.formUpdate.value.locate || "";
    let link = this.formUpdate.value.link || "";
    let files_id: string[] = this.userGets.files_id;
    let post_id: string[] = this.userGets.post_id;
    let bloq: any[] = this.userGets.bloq
    let services: string[] = this.userGets.services;
    let booking: string[] = this.userGets.booking;
    let code = this.userGets.code;
    let active = this.userGets.active;
    let followers: string[] = this.userGets.followers;
    let follows: Person[] = this.userGets.follows;


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
    console.log(filePhotoProfile)
      this.userService.putUser(user, this.idsession).subscribe(res => {
        if(filePhotoProfile.files){
          this.userService.putProfilePhoto(filePhotoProfile.files[0], this.idsession).subscribe(res => {})
        }
        if(filePdf.files){
          this.userService.putProfilepdf(filePdf.files[0], this.idsession).subscribe(res => {})
        }
        if (res) {
          window.alert("Actualizados los datos")
          this.formUpdate.reset();
          window.location.replace(environment.baseUrl+"Profile/" + this.userGets._id)
        } else {
          window.alert("No ha sido posible actualizar los datos")
        }
      })
  }

  /** fin función */


  /** función sobre eleccionar foto */
  photoSelected: string | ArrayBuffer | any = 'https://wpdirecto.com/wp-content/uploads/2017/08/alt-de-una-imagen.png';
  file: File | any = [];

  onPhotoSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }
  /** fin función */

  /** funcion chequear usuario*/
  CheckUsers() {

    let buttonEnterprisePriv = document.getElementById('fileUpdate');
    let extraInfo = document.getElementById('extraInfo');
    let x = localStorage.getItem('User');

    if (x != null) {
      let UserLocalStorage = JSON.parse(x);
      this.rol = UserLocalStorage.rol;
      this.idLocalStorage = UserLocalStorage.id;

      switch (this.rol) {
        case "userRecurrent":
          buttonEnterprisePriv!.style.display = 'none';
          extraInfo!.style.display = 'none';
          break;
        case "enterprise":
          buttonEnterprisePriv!.style.display = 'grid';
          break;
        case "teacher":
          buttonEnterprisePriv!.style.display = 'grid';
          break;
      }
    }
  }
  /** fin funcion */
}

