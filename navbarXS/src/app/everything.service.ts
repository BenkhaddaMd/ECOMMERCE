import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EverythingService {

  constructor() { }
}

export class Product{
  id:null;
  name: null; 
  description: null;
  price: number;
  category: null;
  color: null;
  quantity: null;
}
export class commands{
  idProduct:number;
  quantity:number;
}
export class TempoPanier{
  quantity:number;
  product:Product;
}
export class Category{
  id:null;
  name: null; 
  description: null;
}


