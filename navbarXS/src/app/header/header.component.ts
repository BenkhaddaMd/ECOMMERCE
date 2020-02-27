import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  allProducts : Product[];
  allCategories: Category[];
  productsSelected : Product[];
  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit() {
     this.http.get('http://localhost:8000/api/products').subscribe(
      (data:Product[]) =>   {
        this.allProducts = data;
        this.productsSelected = data;
      },
      error => console.error(error)
      );

      this.http.get('http://localhost:8000/api/categories').subscribe(
      (data:Category[]) =>   {
        this.allCategories = data;
      },
      error => console.error(error)
      );
  }
   
  switch(categoryName){
    this.productsSelected = [];
    let i = 0;
    for(let pro of this.allProducts)
    {
      if(pro.category==categoryName)  {this.productsSelected[i]=pro; i++;}
    }
    
  }
   all(){
    this.productsSelected=this.allProducts;
  }
  toProduct(id){
    this.router.navigate(['/products',id]);
  }
}

class Product{
  id: number;
     name: string; 
     description: string;
     price: string;
     category: string;
     color: string;
     quantity: string;
}

class Category{
  id: number;
     name: string; 
     description: string;
}

