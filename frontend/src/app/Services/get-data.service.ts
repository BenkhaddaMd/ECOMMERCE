import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  private url = "http://127.0.0.1:8000/api"
  constructor(private http:HttpClient) {


   }
   get_data():Observable<object>{
     if(localStorage.getItem('DB') && localStorage.getItem('token')){
       return this.get_data_DB();
     }
     if(localStorage.getItem('id_google')) return this.get_data_google(localStorage.getItem('id_google'),'google')
     if(localStorage.getItem('id_facebook')) return this.get_data_google(localStorage.getItem('id_facebook'),'facebook')

   }

get_data_DB(){
  let id = atob(localStorage.getItem('DB'));
  return this.http.get(`${this.url}/getData/${id}&DB`)
}
get_data_google(id,from){

  return this.http.get(`${this.url}/getData/${id}&${from}`)
}

}
