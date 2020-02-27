import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginRegisterService } from '../Services/login-register.service';
import {  SnotifyService } from 'ng-snotify';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-response-reset-password',
  templateUrl: './response-reset-password.component.html',
  styleUrls: ['./response-reset-password.component.css']
})
export class ResponseResetPasswordComponent implements OnInit {
public form  = {
  email:'',
  password_confirmation:'',
  password:'',
  token:''
}

  constructor(
    private route:ActivatedRoute,
    private jarwis:LoginRegisterService,
    private router: Router,
    private notify:SnotifyService,
    private Toastr:ToastrService
  ) { 
   
    
    
    this.route.queryParams.subscribe(
      params =>{
        this.form.token = params['token'];
        
      }
       )
  }
  private a;
  public invalid_feedback=false;

  ngOnInit() {
    
  }

  add_Class_is_valid(e){
    /*if(elemnt.target.classList.contains("ng-valid")) elemnt.classlist.add("is-valid")*/
let val = e.target.getAttribute("name");
if(document.querySelector(`input[name=${val}]`).classList.contains("ng-valid")){
  document.querySelector(`input[name=${val}]`).classList.add("is-valid")
}
else{
  document.querySelector(`input[name=${val}]`).classList.remove("is-valid")
}
}


  onSubmit(){
  this.notify.info("Wait...!")
this.jarwis.changePassword(this.form).subscribe(
  data => this.handleData(data),
  error => this.handleError(error)
)
  }
  handleData(data){
  this.notify.remove()
this.notify.confirm("Done! now go to login",{
  timeout:5000,
  pauseOnHover:false,
  closeOnClick:false,
  buttons:[
    {text:'Ok!',action:toastr=>{
      this.notify.remove()
      this.router.navigate(["/login"])
    }}
  ]
})


  }
  handleError(error){
   this.notify.remove()
   this.notify.error("Email or Token not valid",{
     timeout:4000,
     pauseOnHover:false,
     closeOnClick:true,
     showProgressBar:false
   })
  }

  verifier_value(){
    let element = document.getElementById("password_confirmation");
    if(this.form.password!=this.form.password_confirmation){
      element.classList.add("is-invalid")
      this.invalid_feedback = true;
   
    }
    else{
      if(element.classList.contains("is-invalid")){
        element.classList.remove("is-invalid")
        this.invalid_feedback  = false;
        

      }
    }
  }
verifier_password(){
  let element = document.getElementById("password_confirmation");
if(this.form.password!='' && this.form.password_confirmation!=''
 && this.form.password!=this.form.password_confirmation){
  
  element.classList.add("is-invalid")
  this.invalid_feedback = true;


}
else {
  element.classList.remove("is-invalid")
  this.invalid_feedback=false;
}

}

}
