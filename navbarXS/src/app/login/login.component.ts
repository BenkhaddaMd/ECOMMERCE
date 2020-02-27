import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRegisterService } from '../Services/login-register.service';
import { TokenService } from '../Services/token.service';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Snotify, SnotifyService } from 'ng-snotify';
import { RepositionScrollStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
public form = {
  id_google:null,
  id_facebook:null,
  email:null,
  password:null,
  password_confirmation:null,
  first_name:null,
  last_name:null,
  address:null,
  city:null,
  phone:null
}
private a = null;
public invalid = false;
auth2: any;
 
  @ViewChild('loginRef', {static: true }) loginElement: ElementRef;

  constructor(
    private http:HttpClient,
    private register_login:LoginRegisterService,
    private handleToken:TokenService,
    private AuthService:AuthService,
    private router:Router,
    private Toastr:ToastrService,
    private ngZone:NgZone,
    private cookie:CookieService,
    private snotify:SnotifyService
    
  )
   { }

  ngOnInit() {
    this.googleSDK();
    this.fbLibrary();
  }
  onSubmit(){
   this.register_login.login(this.form).subscribe(
     data => {
      this.invalid = false;
      this.handleData(data)
     },
     error => {
      this.Toastr.clear()
      this.handleError(error)
     }
   )

}



handleData(token){
localStorage.setItem("DB",btoa(this.form.email));
this.handleToken.handleData(token.access_token);
this.AuthService.change_auth_Staust(true)
this.router.navigate([""])



}
handleError(error){
 
  this.invalid = true;
    this.Toastr.remove(this.a)


  this.a = this.Toastr.error("Error!","invalid email or pasword",{timeOut:3000,
    progressBar:false,
    closeButton:true
    })
document.querySelectorAll("input").
forEach( input  => input.classList.add("is-invalid") )

}



remove_is_invalid(){
  this.invalid = false;
  document.querySelectorAll("input").forEach(data=>{
    if(data.classList.contains("is-invalid")) data.classList.remove("is-invalid")
  })
}

prepareLoginButton() {
 
  this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
    (googleUser) => {
    
      let profile = googleUser.getBasicProfile();
      console.log('Token || ' + googleUser.getAuthResponse().id_token);
      console.log('ID: ' + profile.getId());
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail());
      console.log("********************")
      console.log(googleUser.uc.access_token)
      console.log(googleUser.getBasicProfile())
      this.http.get("https://oauth2.googleapis.com/tokeninfo?id_token="+googleUser.getAuthResponse().id_token).subscribe(
(data:{
  email,given_name,family_name})=>{
  console.log(data)
  this.form.email = data.email
  this.form.last_name=data.given_name
  this.form.first_name=data.family_name
  this.form.id_google=profile.getId()


  this.google_login(googleUser.getAuthResponse().id_token,"google")
  localStorage.setItem("id_google",this.form.id_google)
}
      )
      //YOUR CODE HERE



    }, (error) => {
      alert(JSON.stringify(error, undefined, 2));
    });

}
googleSDK() {

  window['googleSDKLoaded'] = () => {
    window['gapi'].load('auth2', () => {
      this.auth2 = window['gapi'].auth2.init({
        client_id: '202390641791-vj9716lb4ubnok86bsbs1iahshq77986.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.prepareLoginButton();
    });
  }

  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'google-jssdk'));

}


google_login(token,to){
  this.register_login.register_social(this.form,to).subscribe(data=>console.log(data),
  error=>console.log(error)
  )

this.handleToken.set_in_local_storage(token)

this.AuthService.change_auth_Staust(true)
this.naviger()
}
naviger(){
  this.ngZone.run(() => this.router.navigate([""])).then();
}

fbLibrary() {
 
  (window as any).fbAsyncInit = function() {
    window['FB'].init({
      appId      : '2832819243439712',
      cookie     : true,
      xfbml      : true,
      version    : 'v3.1'
    });
    window['FB'].AppEvents.logPageView();
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

}
login() {

window['FB'].login((response) => {
    if (response.authResponse) {
      window['FB'].api('/me', {
        fields: 'last_name, first_name, email'
      }, (userInfo) => {

        
                localStorage.setItem("id_facebook",response.authResponse.userID)
                this.form.id_facebook =   localStorage.getItem("id_facebook")
                this.google_login(response.authResponse.accessToken,"facebook")
                
               
        

      });
       
    } else {
      this.snotify.error("Error","User login failed")
    }
}, {scope: 'email'});
}


}