import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  category = {
    name: null,
    description: null
};
  product = {
    name: null,
    description: null,
    category: null,
    color: null,
    quantity: null
};
  allCategories : Category[] = [];
  allProducts : Product[] = [];
  constructor(private adminService:AdminService,
              private router:Router,
              private route:ActivatedRoute) { }

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

 navigateTo(givenRoute:string){
   if(givenRoute=="admin")
   this.router.navigateByUrl('admin');
   else
   this.router.navigate([givenRoute],{relativeTo: this.route})
 }
}

class Product{

    name: null; 
    description: null;
    category: null;
    color: null;
    quantity: null;
}

class Category{
    name: null; 
    description: null;
}

