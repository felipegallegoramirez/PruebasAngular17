import { Component, OnInit } from '@angular/core';
 
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Post } from '../../models/post';
import { Comment } from '../../models/post';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { Person } from '../../models/survey';
import { environment } from '../../environments/environments';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrl: './post-view.component.css'
})
export class PostViewComponent implements OnInit {
  idUser = "";
  nameUser = "";
  count:number = 0;
  idsession: string = "";
  post:Post = new Post();

  BoxComments: Array<{
    _id:string,
    name:string,
    description:string,
    image: string,
  }> = []

  constructor( private userService: UserService, private activatedRoute: ActivatedRoute, private postService: PostService){

  }

  ngOnInit(): void {
    this.authSession();
    let likeIcon = document.getElementById("likeIcon");
    let x = localStorage.getItem("User");
    if(x!=null){
      let UserLocalStorage = JSON.parse(x);
      this.idUser = UserLocalStorage.id;
      this.nameUser = UserLocalStorage.name;
    }
  
    this.activatedRoute.params.subscribe(params => {
      this.idsession = params['id'];

      this.postService.getPostUnique(this.idsession).subscribe((res) => {
        this.post = res as Post;
        this.post.description = this.post.description.replace(/\n/g, '<br>');
        document.getElementById('descriptionPost')!.innerHTML = this.post.description
        

        if(this.post.likes.findIndex(x => this.idUser == x._id) != -1){
          this.count = 1;
          likeIcon!.style.fontVariationSettings = "'FILL' 1, 'wght' 400,'GRAD' 0,'opsz' 24"
        }
        let x = res.comments as Comment[];

        x.forEach(comment =>{
          this.userService.getUser(comment._id).subscribe(res =>{
            console.log(res)
            this.BoxComments.push({
              _id: comment._id,
              name: comment.name,
              description: comment.description,
              image: res.files_id[0] || ""
            })
          })
        })
      });
    })
    
  }

    
   /**funcion para detectar si esta logeado */
   authSession():void{
    let x = localStorage.getItem('User');

    if(x == null){
      window.location.replace(environment.baseUrl+'Login')
    }
  }
  /**  fin función */

  /** Funcion sobre likes */
  likeit(){
    let likeIcon = document.getElementById("likeIcon");
        let _idPerson = this.idUser;
        let namePerson = this.nameUser;

        const person: Person = {
          _id: _idPerson,
          name:namePerson,
        }

        let _idPost = this.post._id;
        let title = this.post.title;
        let photoPost = this.post.image;
        let creator_image = "";
        let creator_name = this.post.creator_name;
        let creator_id = this.post.creator_id;
        let descriptionPost = this.post.description;
        let likes: Person[] = this.post.likes;
        let comments: Comment[] = this.post.comments;
         
        if(this.count == 0){
          likes.push(person);
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
          this.count++
          likeIcon!.style.fontVariationSettings = "'FILL' 1, 'wght' 400,'GRAD' 0,'opsz' 24"
          this.postService.putPost(post, this.idsession).subscribe((res) => {
          })
          
        }else{
          let deletePerson = likes.indexOf(person);
          likes.splice(deletePerson,1);
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
          this.count--
          likeIcon!.style.fontVariationSettings = "'FILL' 0, 'wght' 400,'GRAD' 0,'opsz' 24"
          this.postService.putPost(post, this.idsession).subscribe((res) => {
          })
        }
    
    /**Fin función */
  }


  /**  función para los comentarios*/

  commentForm = new FormGroup({
    commentUser: new FormControl("", [Validators.required]) 
  })

  comment(): void{
    
    /** Comment */
    let _idComment = this.idUser
    let creatorCommentName = this.nameUser;
    let commentDescription = this.commentForm.value.commentUser;

    const commentSend: Comment ={
      _id: _idComment,
      name: creatorCommentName,
      description: commentDescription || "",
    }
    /** Post */
    let _idPost = this.post._id;
    let title = this.post.title;
    let photoPost = this.post.image;
    let creator_image = this.post.creator_image;
    let creator_name = this.post.creator_name;
    let creator_id = this.post.creator_id;
    let descriptionPost = this.post.description;
    let likes:Person[] = this.post.likes;
    let comments: Comment[] = this.post.comments;

    if(!comments){
      comments = []
    }

    this.userService.getUser(this.idUser).subscribe(res => {
      this.BoxComments.push({
        _id: _idComment,
        name: creatorCommentName,
        description: commentDescription || "",
        image: res.files_id[0] || ""
      })
    })

   
    comments.push(commentSend);

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
    this.postService.putPost(post, this.idsession).subscribe((res) => {
      if(res){
        this.commentForm.reset();
      }else{
        window.alert("No se ha podido enviar el comentario");
      }
    })
     
  
  }

}
