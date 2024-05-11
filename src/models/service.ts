export class Service {
    _id?: string;
    name: string;
    time: Number;
    description:string;
    price:Number;
  
    constructor(
      _id :string = "",
      name: string = "",
      time: number = 0,
      description: string = "",
      price: number = 0,
    ) {
      this._id = _id;
      this.name = name;
      this.time = time;
      this.description = description;
      this.price = price;
    }
  }