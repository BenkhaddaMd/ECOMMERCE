import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin-service.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  category = {
    name: null,
    description: null
};
  product = {
    name: null,
    description: null,
    price: null,
    category: null,
    color: null,
    quantity: null
};
allCategories : Category[] = [];
  constructor(private adminService:AdminService) { }

  ngOnInit() {
    this.adminService.getCategories().subscribe(
      (data:Category[]) =>   {
        this.allCategories = data;
      },
      error => console.error(error)
      );
    
}
onSubmitProduct(){
  this.adminService.createProduct(this.product).subscribe(
   data => console.log(data),
   error => console.error(error)
 )
 this.product.name = null;
 this.product.description = null;
 this.product.color = null;
 this.product.category = null;
 this.product.price = null;
 this.product.quantity = null;

}

}


class Product{

  name: null; 
  description: null;
  price: null;
  category: null;
  color: null;
  quantity: null;
}

class Category{
  name: null; 
  description: null;
}

