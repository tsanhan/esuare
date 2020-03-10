import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  
  public UserName: BehaviorSubject<string> = new BehaviorSubject(null);
  constructor() { 
  }
}
