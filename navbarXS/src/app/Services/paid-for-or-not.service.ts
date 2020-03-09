import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaidForOrNotService {
  private paidFor = new BehaviorSubject<boolean>(false);
  cast = this.paidFor.asObservable();
  constructor() { }
  editePaidFor(etat){
    this.paidFor.next(etat);
  }
}
