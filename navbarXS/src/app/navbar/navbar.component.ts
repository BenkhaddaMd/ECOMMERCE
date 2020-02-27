import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../Services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

public loggedIn:boolean = false;

  constructor(
    private authService:AuthService,
    private router:Router,
    private handleToken:TokenService
  )
   { }

  ngOnInit() {
this.authService.auth_Status.subscribe((data:boolean)=>this.loggedIn=data)
  }
  logout(){
    this.handleToken.remove_Token();
    this.authService.change_auth_Staust(false)
    this.router.navigate([""])
  }

}
