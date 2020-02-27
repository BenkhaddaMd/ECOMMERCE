import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PanierServiceService {

  constructor(private http:HttpClient) { }

  getCommands(idUser){
    return this.http.get(`http://127.0.0.1:8000/api/getCommands/${idUser}`);
  }

  getCommandsLines(id){
    return this.http.get(`http://127.0.0.1:8000/api/getCommandsLines/${id}`);
  }

  getThisProduct(id){
    return this.http.get(`http://127.0.0.1:8000/api/getThisProduct/${id}`);
  }
  getUserId(email){
    return this.http.get(`http://127.0.0.1:8000/api/getUserId/${email}`);
  }
  saveCommands(checkout){
    return this.http.post('http://127.0.0.1:8000/api/saveCommands',checkout);
  }
  saveLineCommand(line){
    return this.http.post('http://127.0.0.1:8000/api/saveLineCommand',line);

  }

}
