import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin-service.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  selectedImage:File = null;
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
    quantity: null,
    image:null
};
allCategories : Category[] = [];
  constructor(private adminService:AdminService,private router:Router,private http:HttpClient) { }

  ngOnInit() {
    this.product.image='h';
    this.adminService.getCategories().subscribe(
      (data:Category[]) =>   {
        this.allCategories = data;
      },
      error => console.error(error)
      );
    
}
onSubmitProduct(){
  this.adminService.createProduct(this.product).subscribe(
   data =>  {
     this.onUpload();
     this.router.navigateByUrl("admin");
    },
   error => console.error(error)
 )
}
onImagesSelected(event){
  this.selectedImage = <File>event.target.files[0];
  this.product.image = this.selectedImage.name;

}

onUpload(){
  const fd = new FormData();
  fd.append('image', this.selectedImage, this.selectedImage.name);
  this.http.post('http://localhost:8000/api/imageUpload', fd).subscribe(
    data=>console.log(data)
  );
}

}


class Product{

  name: null; 
  description: null;
  price: null;
  category: null;
  color: null;
  quantity: null;
  image:null
}

class Category{
  name: null; 
  description: null;
}

