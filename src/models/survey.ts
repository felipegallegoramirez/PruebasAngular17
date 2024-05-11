export class Survey{
    _id:string;
    title:string;
    answers:Array<string>;
    idbooking:string;
    responsible:Person;
    respondent:Person;
    rating:number;
    state:boolean;
    hour:string;
    day:string;
    month:string;
    
    constructor(_id:string = "",
        title:string = "",
        answers:Array<string> = [],
        idbooking:string = "",
        responsible:Person = new Person(),
        respondent: Person = new Person(),
        rating:number = 0,
        state:boolean = false,
        hour:string = "",
        day:string = "",
        month:string = "",
        ){
        
            this._id = _id;
            this.title = title;
            this.answers = answers;
            this.idbooking = idbooking;
            this.responsible = responsible;
            this.respondent = respondent;
            this.rating = rating;
            this.state = state;      
            this.hour = hour;      
            this.day = day;      
            this.month = month;              
    }
}
export class Person {
    _id:string;
    name:string;

    constructor(_id:string = "",
        name:string = "") {
        this._id = _id;
        this.name = name;
    }
}
