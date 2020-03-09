import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PanierServiceService } from '../Services/panier-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { commands } from '../everything.service';
import { PaidForOrNotService } from '../Services/paid-for-or-not.service';
import { interval, Subscription, of } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('paypal', { static:true }) paypalElement: ElementRef;
  subscription: Subscription;
  timing = interval(3000);
  
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
    paymentWay:null,
    total:null
  };
  
  commandLine ={
    idCommand:null,
    idProduct:null,
    quantity:null
  };
  allCommands:commands[] = JSON.parse(localStorage.getItem('command'));
  first_name=null;
  last_name=null;
  public paidFor:boolean = false;
  constructor(private panierServie:PanierServiceService,
              private router:Router,
              private route:ActivatedRoute,
              private paymentServ:PaidForOrNotService) { }

  onSubmit(){
    
        this.checkoutForm.fullname = `${this.first_name} ${this.last_name}`;
        this.checkoutForm.total = localStorage.getItem('total');
        this.startTask();
   
  }

  startTask(){
    let email = atob(localStorage.getItem('DB'));
    this.panierServie.getUserId(email).subscribe(
      data=> 
      {
        this.checkoutForm.idUser=data;
        this.insertCommand();

      },
      error=>console.error(error)
    );   
  }
  insertCommand(){
    this.panierServie.saveCommands(this.checkoutForm).subscribe(
      data => {
        console.log(data);
        
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
                                this.router.navigateByUrl('payment');
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
  checkQuantity(){
    let check:boolean;
    for(let oneLine of this.allCommands)
    {
    this.panierServie.getQuantity(oneLine.idProduct).subscribe( 
      (data:number)=> {
        let quan = data;
        if(quan < oneLine.quantity)  {
          this.paymentServ.editePaidFor(true);          
        }
        else this.paymentServ.editePaidFor(false);
      });
    }
    this.paymentServ.cast.subscribe(
      data => check = data
    );
      if(check) console.log("out of quantity");
      else console.log("not yet");
      
      
     

  }
  ngOnInit() {
    const source = of('Mohammed');
    source.subscribe(data => console.log(data)
    )


    this.subscription = this.timing.subscribe(val => this.checkQuantity());
}

  
}
