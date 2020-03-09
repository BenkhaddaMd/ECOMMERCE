import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PaidForOrNotService } from '../Services/paid-for-or-not.service';
import { Router } from '@angular/router';
import { PanierServiceService } from '../Services/panier-service.service';
import { commands, TempoPanier, Product } from '../everything.service';

declare var paypal;
@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {
   price = localStorage.getItem('total');

  @ViewChild('paypal', { static:true }) paypalElement: ElementRef;
  constructor(private paidForService:PaidForOrNotService,
    private panierServie:PanierServiceService,
              private router:Router) {}
  paidFor:boolean;

  cancel(){
    // delete insered commands
    // let the localStorage in his place :)
  }
  allCommands:commands[] = [];
  allTempoCommands:TempoPanier[] = [];



 
  total(){
    let tot = 0;
    for(let line of this.allTempoCommands)
    {
      tot += line.quantity*line.product.price;
    }
    return tot;
  }
  deleteCommand(id){
    let i=0;
    
      for(let oneLine of this.allCommands)
      {
        
        if(oneLine.idProduct == id)
        {
          this.allCommands.splice(i, 1)
        }
        if(this.allTempoCommands[i].product.id == id)
        {
          this.allTempoCommands.splice(i, 1)
  
        }
        i++;
      }
      localStorage.setItem('command', JSON.stringify(this.allCommands));
    
  }

  getCommandsLines(){
    this.allTempoCommands = [];
    for(let oneLine of this.allCommands)
    this.panierServie.getThisProduct(oneLine.idProduct).subscribe(
      (data:Product)=>
      {
        this.allTempoCommands.push({quantity:oneLine.quantity,product:data});
      },
      error=>console.error(error)
  );
  }

  onCheckout(){
    localStorage.setItem('total', this.total().toString());
    this.router.navigateByUrl('checkout');
  }
  ngOnInit() {

    if(JSON.parse(localStorage.getItem('command')) == undefined){
      localStorage.setItem('command','[]');
    }
    this.allCommands = JSON.parse(localStorage.getItem('command'));

    this.getCommandsLines();

    this.paidForService.cast.subscribe(
      data => this.paidFor = data
    );
    const self = this;
    let total = localStorage.getItem('total');
    
  paypal.Button.render({
          // Configure environment
          env: 'sandbox',
          client: {
            sandbox: 'Ac-Yyy9bzD_LPiKoN70zmDMlDouprM_ZGDuETME1G4g11EFaxGCcprPtwpclm-17c9Jz7NvkEgg1OG2l',
            production: 'demo_production_client_id'
          },
          // Customize button (optional)
          locale: 'en_US',
          style: {
            size: 'large',
            color: 'gold',
            shape: 'pill',
          },

          // Enable Pay Now checkout flow (optional)
          commit: true,

          // Set up a payment
          payment: function(data, actions) {
            return actions.payment.create({
              redirect_urls:{
                  return_url:`http://localhost:8000/api/execute-payment?price=${localStorage.getItem('total')}`
              },
              transactions: [{
                amount: {
                  total: total,
                  currency: 'USD'
                }
              }]
            });
          },
          // Execute the payment
          onAuthorize: function(data, actions) {
            self.paidForService.editePaidFor(true);
            //delete cart from localStorage   :)
            return actions.redirect();
          }
        }, '#paypal-button');


}

  
}
