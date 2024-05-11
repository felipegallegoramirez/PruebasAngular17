import { Person } from "./survey";

export class Post{
    _id:string;
    title:string;
    image:string;
    creator_image:string;
    creator_name:string;
    creator_id:string;
    description:string;
    likes:Array<Person>;
    comments:Array<Comment>;

    constructor(_id:string = "",
        title:string = "",
        creator_name:string = "",
        image = "",
        creator_image:string = "",
        creator_id:string = "",
        description:string = "",
        likes:Array<Person> = [],
        comments:Array<Comment> = []
    ){
        this._id = _id;
        this.title = title
        this.image = image;
        this.creator_image = creator_image;
        this.creator_name = creator_name;
        this.creator_id = creator_id;
        this.description = description;
        this.likes = likes;
        this.comments = comments;
    }
}

export class Comment{
    _id:string;
    name:string;
    description:string;
    constructor(_id:string = "",
        name:string = "",
        description:string = ""
    ){
        this._id = _id;
        this.name = name;
        this.description = description;
    }
}