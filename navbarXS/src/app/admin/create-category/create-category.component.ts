import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  category = {
    name: null,
    description: null
};
  constructor(private adminService:AdminService,private router:Router) { }

  ngOnInit() {
  }
  onSubmitCategory(){
    this.adminService.createCategory(this.category).subscribe(
     data => this.router.navigateByUrl("admin"),
  
     error => console.error(error)
   );

}

}
class Category{
  name: null; 
  description: null;
}
