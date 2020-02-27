import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin-service.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  category = {
    name: null,
    description: null
};
  product = {
    id:null,
    name: null,
    description: null,
    category: null,
    price: null,
    color: null,
    quantity: null
};
  allCategories : Category[] = [];
  allProducts : Product[] = [];
  constructor(private adminService:AdminService) { }

  ngOnInit() {
    this.adminService.getCategories().subscribe(
      (data:Category[]) =>   {
        this.allCategories = data;
      },
      error => console.error(error)
      );

      this.adminService.getProducts().subscribe(
        (data:Product[]) =>   {
          this.allProducts = data;
        },
        error => console.error(error)
        );
  }

  update(){   
    for(let i=0;i<this.allProducts.length;i++)
    {
         this.adminService.updateProducts(this.allProducts[i]).subscribe(
          data => console.log(data),
          error => console.error(error)  
        );
    }
    this.ngOnInit();
  }
  delete(id){
    this.adminService.deleteProducts(this.allProducts[id].id).subscribe(
      data => console.log(data)
      ,
      error => console.error(error)
      );   
      this.ngOnInit();

  }

}

class Product{
    id:null;
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

