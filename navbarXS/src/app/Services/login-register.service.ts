import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {
private url = "http://127.0.0.1:8000/api"
  constructor
  (
    private http:HttpClient
  ) 
  { }
  login(data){
    return this.http.post(`${this.url}/login`,data)
  }
  register(data){
    return this.http.post(`${this.url}/register`,data)
  }
  reset_password(data){
    return this.http.post(`${this.url}/resetPassword`,data)
  }
  changePassword(data){
    return this.http.post(`${this.url}/changepassword`,data);
  }

  register_social(data,to){
  if(to=="google"){
    return this.http.post(`${this.url}/registerSocial`,data)
  }
  else{
    return this.http.post(`${this.url}/registerSocial_google`,data)
  }
  }
}
