import { Component, OnInit } from '@angular/core';
import { PanierServiceService } from '../Services/panier-service.service';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {
  public userId = null;
  panierInfo :panier[] = [];
  constructor(private panierServie:PanierServiceService,) { }

  ngOnInit() {
   
    this.getPurchases();
    
  }
 
  getPurchases(){
    let email = atob(localStorage.getItem('DB'));

    this.panierServie.getUserId(email).subscribe(
      data=> {        
        this.panierServie.getCommands(data).subscribe(
          (data:command[])  => {
           
            if(data)
            {
              for(let oneCommand of data)
              {

              this.panierServie.getCommandsLines(oneCommand.id).subscribe(
                (data:commandLine[]) => 
                {            

                  for(let oneLine of data) 
                  {
                        this.panierServie.getThisProduct(oneLine.idProduct).subscribe(
                            (data:Product)=>
                            {
                              this.panierInfo.push({quantity:oneLine.quantity,status:oneLine.status,product:data});
                            },
                            error=>console.error(error)
                        );
                  }
                },
                error => console.error(error)
              );
             }
            }
            
          },
          error => console.error(error)
        );
      },
      error=>console.error(error)
      
    );
  }

}

class panier{
  quantity:number;
  status:boolean;
  product:Product;
}
class command{
  id:null;
  idUser:null;
  fullname:null;
  email:null;
  numero:null;
  address:null;
  city:null;
  country:null;
  paymentWay:null;
}
class commandLine{
  id:null;
  idCommand:null;
  idProduct:null;
  quantity:number;
  status:null;
}
class Product{
  id:null;
  name: null; 
  description: null;
  price: number;
  category: null;
  color: null;
  quantity: null;
}
