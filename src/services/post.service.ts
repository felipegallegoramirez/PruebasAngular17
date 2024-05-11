import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Post } from '../models/post';
import { environment } from "../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  post: Post[] = [];

  private apiUrl = environment.backend+'api/';

  createPost(post:Post){
    return this.http.post<Post>(this.apiUrl + "post/", post);
  }

  createPostIMG(post:Post, file: File){
    const fd = new FormData()

    fd.append('_id', post._id || "");
    fd.append('title', post.title || "");
    fd.append('image', file);
    fd.append('creator_image', post.creator_image || "");
    fd.append('creator_name', post.creator_name || "");
    fd.append('creator_id', post.creator_id || "");
    fd.append('description', post.description || "");

    return this.http.post<Post>(this.apiUrl + "post/", fd);
  }
  
  postsByUser(id:string){
    return this.http.get<Post[]>(this.apiUrl + `post/postsByUser/${id}`);
  }

  getPosts(){
    return this.http.get<Post[]>(this.apiUrl + "post/")
  }

  putPost(post: Post,id:string) {
    return this.http.put(this.apiUrl + `post/${id}`, post);
    
  }

  getPostUnique(id:string){
    return this.http.get<Post>(this.apiUrl + `post/unique/${id}`);
  }

  deletePost(id:string){
    return this.http.delete<Post>(this.apiUrl + `post/${id}`)
  }
}
