import { Component, OnInit } from '@angular/core';
import {CacheService} from '../Services/cache-service-service.service';
import {Router} from '@angular/router';
import { CustomHttpService } from '../Services/custom-http-service-service.service';
import { MessageService } from 'primeng/primeng';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-dash-board-container',
  templateUrl: './admin-dash-board-container.component.html',
  styleUrls: ['./admin-dash-board-container.component.css']
})
export class AdminDashBoardContainerComponent implements OnInit {

  admin_username : string ;
  adminRole: String ;
  constructor(
    private  cacheService : CacheService, 
    private router: Router , 
    private httpService : CustomHttpService,
    private messageService : MessageService,
    
    ) { }


  ngOnInit() {
    this.admin_username = this.cacheService.username ;
    this.adminRole = this.cacheService.role ;
  }


  logout(){
    console.log("Signing out admin...");
    this.httpService.logout(this.admin_username).subscribe(data => {
      this.messageService.add({
        severity : 'success' , detail : data.message , summary : "Success Message"});
        window.sessionStorage.setItem('adminlogin','');
        window.sessionStorage.setItem('adminusername','');
        window.sessionStorage.setItem('adminpassword','');
        this.cacheService.loggedIn = false ;
        this.router.navigate(['/']);
    }, (error: HttpErrorResponse) => {
      this.messageService.add({
        severity : 'error' , detail : error.message, summary : "Error Message"});
    });
  }

}
