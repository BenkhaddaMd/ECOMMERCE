import { Component, OnInit } from '@angular/core';
import { PanierServiceService } from '../Services/panier-service.service';
import { Router } from '@angular/router';
import { commands } from '../everything.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  subscribeEnd = false;
  quantityTest  :boolean= null;
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
  };
  allCommands:commands[] = JSON.parse(localStorage.getItem('command'));
  first_name=null;
  last_name=null;
  constructor(private panierServie:PanierServiceService,
              private router:Router) { }

  onSubmit(){
   this.checkoutForm.fullname=`${this.first_name} ${this.last_name}`;
   this.insertCommand();
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
        this.commandLine.idCommand=data;
        this.insertCommandsLine();
      },
      error=>console.error(error)
      
    );
  }

  reduceQuantity(quantitySelected:number,idProduct){
    let quan:number;
    this.panierServie.getQuantity(idProduct).subscribe(
        (data:number)=> quan = data,
        error=>error.log(error)
      );
      
      console.log(quan);
      console.log(quantitySelected);
        if(quantitySelected <= quan){
          quan -= quantitySelected;
          this.panierServie.reduceQuantity({id:idProduct,quantity:quan}).subscribe(
            error=> console.error(error)
                      );
        }
        else{
          this.router.navigateByUrl('cart?outofquantity=true');
        }

  
  }

  insertCommandsLine(){
    let i = 0;
    for(let oneLine of this.allCommands)
    {
      this.commandLine.idProduct=oneLine.idProduct;
      this.commandLine.quantity=oneLine.quantity;
      
      this.panierServie.getQuantity(oneLine.idProduct).subscribe( 
          (data:number)=> {
            let quan = data;
            if(oneLine.quantity <= quan){
              quan -= oneLine.quantity;
              this.panierServie.reduceQuantity({id:oneLine.idProduct,quantity:quan}).subscribe(
                data=> {},
                error=> console.error(error)
                          );

                          this.panierServie.saveLineCommand(this.commandLine).subscribe(
                            data => {
                              if(this.allCommands[i] == undefined){
                                localStorage.setItem('command','[]');
                                this.router.navigateByUrl('cart');
                              }
                            },
                            error=>console.error(error)
                          );
            }
            else{
              this.router.navigateByUrl('cart?outofquantity=true');
            }
          },
          error=>error.log(error)
        );
        
      
      i++;
    }
  }
  ngOnInit() {
    this.getUserid()
  }

}
