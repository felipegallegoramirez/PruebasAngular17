export class Request{
    _id:string;
    iduser:string;
    name:string;
    cellphone: string;

    constructor(_id:string = "",
        iduser:string = "",
        name:string = "",
        cellphone:string = "",
        ){

            this._id = _id;
            this.iduser = iduser;
            this.name = name;
            this.cellphone = cellphone; 
            
    }
}