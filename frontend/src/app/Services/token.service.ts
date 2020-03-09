import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
private all_iss:Array<string> = [
                                  "http://127.0.0.1:8000/api/login",
                                  "http://127.0.0.1:8000/api/register",
                                  "accounts.google.com"
                                ];
  constructor(
    private http:HttpClient,
    private cookie:CookieService
  ) { }
  handleData(token){
    this.set_in_local_storage(token)
    return this.loggedIn()
  }

  set_in_local_storage(data){
    localStorage.setItem("token",data)

  }
  get_Token(){
    return localStorage.getItem('token')
  }
  remove_Token(){
    localStorage.removeItem('token')
    localStorage.removeItem('DB')
    localStorage.removeItem("id_facebook")
    localStorage.removeItem("id_google")
  }
  token_is_valid():boolean{
    let token = this.get_Token()
    let pyload ;
    if(localStorage.getItem("token") && localStorage.getItem("id_facebook")){
      if(this.verfier_token()){return true}
    }
    if(token && localStorage.getItem("id_google") && this.toke_is_valid_google_facebook(token)) return true;
    if(token)
    {
    pyload = this.pyload(token)
    return (this.all_iss.indexOf(pyload.iss)!=-1)? true : false;
    }

    return false;
}

pyload(data)
{
let token = data.split(".")[1];
   return JSON.parse(atob(token));
}
loggedIn(){
  return this.token_is_valid()
}


toke_is_valid_google_facebook(token) {
  let condition =  false;
  if(token){
  this.http.get("https://oauth2.googleapis.com/tokeninfo?id_token="+token).subscribe(
    (data:{iss})=>{
      if(this.all_iss.indexOf(data.iss)!=-1){
        condition = true
      }
    },
    error=>{condition =  false;}
  )}
  return condition;


}
verfier_token(){
  let co = false;
  let id = localStorage.getItem("id_facebook")
  let token = localStorage.getItem("token")
  if(token && id){
  return this.http.get("https://graph.facebook.com/"+id+"/accounts?access_token="+token).subscribe(
    data=>co=true
  )}
  return co;

}

set_cookie(id,from){
this.cookie.set("id",id)
this.cookie.set("from",from)
}
remove_cookie(){
  if(this.cookie.check("id")){this.cookie.delete("id")}
  if(this.cookie.check("from")){this.cookie.delete("from")}

}

}