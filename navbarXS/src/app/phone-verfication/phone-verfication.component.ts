import { Component, OnInit } from '@angular/core';
import { PhoneVerificationService } from '../Services/phone-verification.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-phone-verfication',
  templateUrl: './phone-verfication.component.html',
  styleUrls: ['./phone-verfication.component.css']
})
export class PhoneVerficationComponent implements OnInit {
/*public verfier_condition = true;
private code_from_api=null;
private verfier_condition_for_renvoyer=true;

public recaptchaVerifier
  public form = {
    phone:null,
    code:null,
    code_verfication:null
  }
  private confirm_result
  constructor(
    private phone_service:PhoneVerificationService,
    private notify:SnotifyService
  ) { }

*/
  ngOnInit() {
    
  }
  /*get return_window(){
    return window
  }
  onSubmit() {
    this.verfier_condition_for_renvoyer=true;
    this.notify.info("Wait..!",{
      timeout:20000,
      showProgressBar:true,
      closeOnClick:false,
      pauseOnHover:false
    })
  
this.phone_service.send(this.form).subscribe(
 
  (data:{code})=>{
    this.notify.remove()
    this.notify.info("Msg Send",{
      showProgressBar:false,
      pauseOnHover:false
    });
    this.verfier_condition=false;
   this.code_from_api = data.code;
   this.verfier_condition_for_renvoyer=false;

  },
  error=>alert("invalid phone number")
  )
  }
  
onSubmit_code(){
if(this.form.code_verfication==this.code_from_api){
  this.notify.remove()
this.notify.success("Done!",{
  showProgressBar:false,
  pauseOnHover:false
})

}
else{
  this.notify.remove()
  document.querySelector("input[name='code_verfication'").classList.add("is-invalid")
 
}

}

Renvoyer_code(){
  this.onSubmit();
}
remove_classçin_valid(){
  if(document.querySelector("input[name='code_verfication'").classList.contains("is-invalid"))
  document.querySelector("input[name='code_verfication'").classList.remove("is-invalid")
}*/
}




