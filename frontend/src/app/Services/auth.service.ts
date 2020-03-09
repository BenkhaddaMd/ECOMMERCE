import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private loggedIn = new BehaviorSubject<boolean>(this.tokenService.loggedIn())
public auth_Status  = this.loggedIn.asObservable();

  constructor(private tokenService:TokenService,
              private http:HttpClient) { }
 
  change_auth_Staust(data:boolean){
    this.loggedIn.next(data)
  }

  
}
