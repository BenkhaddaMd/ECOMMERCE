import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin-service.service';

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
  constructor(private adminService:AdminService) { }

  ngOnInit() {
  }
  onSubmitCategory(){
    this.adminService.createCategory(this.category).subscribe(
     data => console.log(data),
     error => console.error(error)
   );
   this.category.name = null;
 this.category.description = null;
}

}
class Category{
  name: null; 
  description: null;
}
