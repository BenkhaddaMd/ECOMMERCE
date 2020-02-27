import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../Services/token.service';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public quantitySelected;
  public maxQuantity:number;
  public theProduct : Product;
  public command :command[]= [];
  public loggedIn:boolean;
  constructor(private http:HttpClient,private route:ActivatedRoute, 
              private router:Router ,
              private authService:AuthService) { }

  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));        
    this.getProduct(id);
    
  }
  
  addPanier(){
    this.authService.auth_Status.subscribe((data:boolean)=>this.loggedIn=data);
    if(this.loggedIn)
    this.makeCommand();
    else
    this.router.navigateByUrl('/login');
   

  }
  makeCommand(){
    if (!(localStorage.getItem("command") === null)) 
    {
      this.command = JSON.parse(localStorage.getItem('command'));
    }

    if(this.quantitySelected === undefined)
    this.quantitySelected=1;
    let ifexistalready = 0;
    for(let line of this.command)
    {
      if(line.idProduct == this.theProduct.id)
      {
        line.quantity += this.quantitySelected;
        ifexistalready=1;
      }
    }

    if(!ifexistalready){this.command.push({idProduct:this.theProduct.id,quantity:this.quantitySelected});}

    localStorage.setItem('command', JSON.stringify(this.command));
    this.command = [];
  }

  getProduct(id)
  {
    this.http.get(`http://localhost:8000/api/product/${id}`).subscribe(
      (data:Product) =>   {
        this.theProduct = data;
        this.maxQuantity = data.quantity;        
      },
      error => console.error(error)
      );
  }

  
}

class Product{
  id: number;
     name: string; 
     description: string;
     price: string;
     category: string;
     color: string;
     quantity: number;
}

class command{
  idProduct:number;
  quantity:number;
}