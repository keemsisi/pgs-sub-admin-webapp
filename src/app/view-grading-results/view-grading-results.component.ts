import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomHttpService } from '../Services/custom-http-service-service.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-grading-results',
  templateUrl: './view-grading-results.component.html',
  styleUrls: ['./view-grading-results.component.css']
})
export class ViewGradingResultsComponent implements OnInit {

  gradingResults: Observable<Array<Object>> = new Observable<Array<Object>>() ;
  username : String  ;
  
  constructor(
    private httpRequest: CustomHttpService, 
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
    ) {
     }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.username = params['username']; // assigns the username ;
      this.getUserGrades(this.username); // get the user information 
    });
  }

  /**
   *
   */
 public getUserGrades(username : String) : void {
    //fetch the staff grading result from the server 
    this.httpRequest.gradeUserCV(window.localStorage.getItem('spNumber')).subscribe(data => {
      console.log(data.grades)
      this.gradingResults = data.grades ;
      this.messageService.add({ severity: 'success', summary: this.username+"grades where successfully fetched", detail: data.message });
    }, (error: HttpErrorResponse) => {
      console.error("ERROR_STATUS  ::: " + error.status);
      console.error("ERROR_MESSAGE ::: " + error.message);
      this.messageService.add({ severity: 'success', summary: "Error occured while fetching the grades", detail: error.message });
    })

  }

}
