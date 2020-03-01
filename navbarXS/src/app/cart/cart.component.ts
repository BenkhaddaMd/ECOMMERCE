import { Component, OnInit } from '@angular/core';
import { PanierServiceService } from '../Services/panier-service.service';
import { commands, TempoPanier, Product } from '../everything.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  allCommands:commands[] = [];
  allTempoCommands:TempoPanier[] = [];
  constructor(private panierServie:PanierServiceService) { }

  ngOnInit() {
    if(JSON.parse(localStorage.getItem('command')) == undefined){
      localStorage.setItem('command','[]');
    }
    this.allCommands = JSON.parse(localStorage.getItem('command'));

    this.getCommandsLines();
  }
 
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
}
