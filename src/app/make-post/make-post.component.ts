import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validator, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { Comment, Post } from '../../models/post';
import { User } from '../../models/user';
import { Person } from '../../models/survey';
import { environment } from '../../environments/environments';

@Component({
  selector: 'app-make-post',
  templateUrl: './make-post.component.html',
  styleUrl: './make-post.component.css'
})
export class MakePostComponent implements OnInit{
  
  idsession: string = "";
  userGets: User = new User; 

  constructor(private activateRoute: ActivatedRoute, private userService: UserService, private postService: PostService){

  }

  ngOnInit(): void {
    this.authSession();
    this.activateRoute.params.subscribe(params => {
      this.idsession = params['id'];

      this.userService.getUser(this.idsession).subscribe((res) => {
        this.userGets = res as User
        
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

  /** funcion para post */

  formMakePost = new FormGroup({
    title: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required])
  })

  createPost(): void{
    let _id = this.userGets._id;
    let name = this.userGets.name;
    let email = this.userGets.email;
    let password = this.userGets.password;
    let rol = this.userGets.rol;
    let description = this.userGets.description;
    let category = this.userGets.category;
    let locate = this.userGets.locate;
    let link = this.userGets.link;
    let files_id: string[] = this.userGets.files_id;
    let post_id:string[] = this.userGets.post_id;
    let bloq:any[] = this.userGets.bloq
    let services:string[]  = this.userGets.services;
    let booking:string[]  = this.userGets.booking;
    let code = this.userGets.code;
    let active = this.userGets.active;
    let followers:string[] = this.userGets.followers;
    let follows: Person[] = this.userGets.follows;
    
    /** Post */
    let _idPost = "";
    let title = this.formMakePost.value.title;
    let photoPost =  "";
    let creator_image = this.userGets.files_id[0];
    let creator_name = this.userGets.name;
    let creator_id = this.userGets._id;
    let descriptionPost = this.formMakePost.value.description;
    let likes: Person[] = [];
    let comments: Comment[] = [];
    let photoReal = <HTMLInputElement> document.getElementById("foto");
    
    if(photoReal.files != null){
      if(title  && photoReal && descriptionPost){


        const post: Post = {
          _id: _idPost, 
          title: title,
          image: photoPost,
          description: descriptionPost,
          creator_image: creator_image,
          creator_name: creator_name,
          creator_id: creator_id,
          likes: likes,
          comments: comments
        }
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
       
      
      this.postService.createPostIMG(post, photoReal.files[0]).subscribe(res => {
        user.post_id.push(res._id);
        this.userService.putUser(user, this.idsession).subscribe(res => {
          if(res){
            console.log("se actualizo")
          }
        })
        if(res){
          this.formMakePost.reset();
          window.alert("Has publicado este post")
          window.location.replace("http://localhost:4200/Profile/"+this.idsession);
        }else{
          window.alert("No se pudo realizar")
        }
      })
      }
    }else{
      if(title  && photoReal && descriptionPost){


        const post: Post = {
          _id: _idPost, 
          title: title,
          image: photoPost,
          description: descriptionPost,
          creator_image: creator_image,
          creator_name: creator_name,
          creator_id: creator_id,
          likes: likes,
          comments: comments
        }
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
       
      
      this.postService.createPost(post).subscribe(res => {
        user.post_id.push(res._id);
        this.userService.putUser(user, this.idsession).subscribe(res => {
          if(res){
            console.log("se actualizo")
          }
        })
        if(res){
          this.formMakePost.reset();
          window.alert("Has publicado este post")
          window.location.replace("http://localhost:4200/Profile/"+this.idsession);
        }else{
          window.alert("No se pudo realizar")
        }
      })
      }
    }
    
    }
  

  



  /** */

  /** función para almacenamiento y vistas de imagen */
  photoSelected: string | ArrayBuffer | any = 'https://wpdirecto.com/wp-content/uploads/2017/08/alt-de-una-imagen.png';
  file: File | any = [];
  
  onPhotoSelected(event:any):void{
    if(event.target.files && event.target.files[0]){
      this.file = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }  
  }

  /** fin función */
}
