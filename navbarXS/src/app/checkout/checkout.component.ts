import { Component, OnInit } from '@angular/core';
import { PanierServiceService } from '../Services/panier-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public checkoutForm = {
    idUser:null,
    fullname:null,
    email:null,
    numero:null,
    address:null,
    city:null,
    country:null,
    paymentWay:null
  };
  
  commandLine ={
    idCommand:null,
    idProduct:null,
    quantity:null
  }
  allCommands:commands[] = JSON.parse(localStorage.getItem('command'));
  first_name=null;
  last_name=null;
  constructor(private panierServie:PanierServiceService,
              private router:Router) { }

  onSubmit(){
   this.checkoutForm.fullname=`${this.first_name} ${this.last_name}`;        
   this.insertCommand()   
   localStorage.removeItem('command');
    this.router.navigateByUrl('cart')
  }
  getUserid(){
    let email = atob(localStorage.getItem('DB'));
    this.panierServie.getUserId(email).subscribe(
      data=> 
      {
        this.checkoutForm.idUser=data;
      },
      error=>console.error(error)
    );   
  }
  insertCommand(){
    this.panierServie.saveCommands(this.checkoutForm).subscribe(
      data => {
        console.log(data);
        this.commandLine.idCommand=data;
        this.insertCommandsLine()
      },
      error=>console.error(error)
      
    );

  }

  insertCommandsLine(){
    for(let oneLine of this.allCommands)
    {
      this.commandLine.idProduct=oneLine.idProduct;
      this.commandLine.quantity=oneLine.quantity;
      this.panierServie.saveLineCommand(this.commandLine).subscribe(
        data=>console.log(data),
        error=>console.error(error)
      )
    }
  }
  ngOnInit() {
    this.getUserid()
  }

}
class commands{
  idProduct:number;
  quantity:number;
}