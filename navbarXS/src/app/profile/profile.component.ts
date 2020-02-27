import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../Services/get-data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public info = {
    first_name:null,
    last_name:null,
    email:null,
    address:null,
    city:null,
    phone:null
                };
public email = atob(localStorage.getItem('DB'));
  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.http.get(`http://localhost:8000/api/profile/${this.email}`).subscribe(
      (data :{first_name,last_name,email,address,city,phone})=> 
      {
        this.info.last_name=data.last_name,
        this.info.first_name=data.first_name, 
        this.info.email=data.email, 
        this.info.address=data.address,
        this.info.city=data.city,
        this.info.phone=data.phone

      },
      error => console.log(error));
    
  }
  onSubmit(){

  }

}
