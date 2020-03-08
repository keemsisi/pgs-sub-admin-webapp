import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class CacheService {
  username: string ;
  password: string ;
  loggedIn = false ;
  role : String ;
  // serverURL = 'http://localhost:8081';
  registered: boolean ;
  serverURL: 'https://promotbotformserver.herokuapp.com';
  payloadData: string ;
  registrationSuccessful: Boolean ;

  constructor() { }
}
