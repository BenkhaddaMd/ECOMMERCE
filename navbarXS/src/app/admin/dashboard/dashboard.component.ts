import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
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
    price: null;
    color: null;
    quantity: null;
}

class Category{
    name: null; 
    description: null;
}

