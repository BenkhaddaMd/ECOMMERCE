import { Component, OnInit } from '@angular/core';
import { LoginRegisterService } from '../Services/login-register.service';
import {SnotifyService} from 'ng-snotify';
import { ToastrService } from 'ngx-toastr';
import { TIMEOUT } from 'dns';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
public form =
{
  email:null
}
  constructor(
    private login_register_reset_Sevice:LoginRegisterService,
    private notify:SnotifyService,
    private Toastr:ToastrService
  ) { }

  ngOnInit() {
  }
  public a;

onSubmit(){
 this.a = this.notify.info("Wait...!",{
   timeout:20000,
   pauseOnHover:false,
   closeOnClick:false,
   showProgressBar:false
 }); 
  
  ;
this.login_register_reset_Sevice.reset_password(this.form).subscribe(
  data=>this.handleData(data),
  error=>this.handleError(error)
  )
}
handleData(data){
  this.notify.remove()
  
 this.notify.success("Done!","Check your Email",{
   timeout:2000,
   showProgressBar:false,
   closeOnClick:false,
   pauseOnHover:false
 })
  this.form.email = null;
 
}
handleError(error){
  this.notify.remove()
this.notify.error(error.error.error,{
  closeOnClick:true,
  showProgressBar:false

})
}
}
