import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../Services/token.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  public loggedIn:boolean = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private authService:AuthService,
    private router:Router,
    private handleToken:TokenService
    ) {}
  

  ngOnInit() {
this.authService.auth_Status.subscribe((data:boolean)=>this.loggedIn=data)
   if( this.handleToken.verfier_token()) this.handleData()



  }
  logout(){
    this.handleToken.remove_Token();
    this.authService.change_auth_Staust(false);
    this.router.navigate([""]);
    localStorage.removeItem('command');
  }
  handleData(){
    this.authService.change_auth_Staust(true)
  }
  
}
