import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin-service.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  category = {
    id:null,
    name: null,
    description: null
};
  allCategories : Category[] = [];

  constructor(private adminService:AdminService) { }

  ngOnInit() {
    this.adminService.getCategories().subscribe(
      (data:Category[]) =>  {this.allCategories = data;
      },
      error => console.error(error)
      );
      
  }

  update(){
  
      
    for(let i=0;i<this.allCategories.length;i++)
    {
         this.adminService.updateCategories(this.allCategories[i]).subscribe(
          data => console.log(data),
          error => console.error(error)  
        );
    }
        this.category.description=null;    
        this.category.name=null;    

      }

    delete(id){
        this.adminService.deleteCategory(this.allCategories[id].id).subscribe(
          data => console.log(data)
          ,
          error => console.error(error)
          );   
          this.ngOnInit();
    
      }
    
  }


class Category{
    id:null;
    name: null; 
    description: null;
}

