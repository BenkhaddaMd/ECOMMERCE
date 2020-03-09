import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http:HttpClient) { }

  createCategory(data){
    return this.http.post('http://localhost:8000/api/createCategory',data);
  }
  createProduct(data){
    return this.http.post('http://localhost:8000/api/createProduct',data);
  }
  getCategories(){
    return this.http.get('http://localhost:8000/api/categories');
  }
  getProducts(){
    return this.http.get('http://localhost:8000/api/products');
  }
  updateCategories(data){
    return this.http.post('http://localhost:8000/api/updateCategory', data);
  }
  updateProducts(data){
    return this.http.post('http://localhost:8000/api/updateProduct', data);
  }
  deleteProducts(id){
    return this.http.get(`http://localhost:8000/api/deleteProduct/${id}`);

  }
  deleteCategory(id){
    return this.http.get(`http://localhost:8000/api/deleteCategory/${id}`);
  }
  
  isAdmin(email){
    return this.http.get(`http://127.0.0.1:8000/api/isAdmin/${email}`);

  }
  
}



