import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Message, MessageService } from 'primeng/primeng';
import { CacheService } from '../Services/cache-service-service.service';
import { CustomHttpService } from '../Services/custom-http-service-service.service';
import { LoginParametersModel } from '../Models/login-parameters-model';
import { DashBoardModelComponent } from '../Models/dash-board-model-component';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  loginForm: FormGroup ;
  valid : Boolean ;

  errorResponse: string;
  adminLoginParameters: LoginParametersModel = new LoginParametersModel();
  postURL = '/formconverter/admin/login';
  adminDashBoardModel: DashBoardModelComponent;
  succMsgs: Message[] = [];
  serverError = false;
  error = '';

  @Input() usernamme: string;
  @Input() username: string;
  hide : Boolean ;

  constructor(private httpService: CustomHttpService,
    private fb: FormBuilder,
    private router: Router,
    private cacheService: CacheService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef

  ) {

  }

  ngOnInit() {



    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.loginForm.valueChanges.subscribe(data =>{
      // this.valid = this.loginForm.invalid
      this.hide = this.loginForm.invalid
      console.log(this.hide);


    })
    // this.loginForm.invalid

  }


  public login(loginFormValue: {}): void {

    this.error = '';

    this.adminLoginParameters.uname = loginFormValue['username'];
    this.adminLoginParameters.password = loginFormValue['password'];


    this.httpService.validateAdminLoginCredential(
      this.loginForm.get('username').value, this.loginForm.get('password').value).subscribe(
        data => {
          if (data.valid) {
            // this.cacheService.dashBoardData.uname = data.uname ;
            if (data.admin)
            this.cacheService.loggedIn = true;
            console.log(this.cacheService.loggedIn)
            // grant user login
            this.cacheService.loggedIn = true;
            this.cacheService.password = this.loginForm.get('password').value;
            this.cacheService.username = this.loginForm.get('username').value;
            this.cacheService.role = this.loginForm.get('username').value;
            this.cacheService.username = this.loginForm.get('username').value;
            // this.cacheService.role = ;

            // save the admin username and password for session
            window.sessionStorage.setItem('adminlogin', 'true');
            window.sessionStorage.setItem('adminusername', this.loginForm.get('username').value);
            window.sessionStorage.setItem('adminpassword', this.loginForm.get('password').value);

            this.router.navigate(['/dashboard/admindashboard']);
          } else {
            console.log("Error...")
            this.messageService.add({ severity: 'error', detail: 'error message from server', summary: 'Invalid loggin Credentials' });
          }
          // window.sessionStorage.setItem('dashBoardData',JSON.stringify( this.cacheService.dashBoardData));

        }, (err: HttpErrorResponse) => {
          this.serverError = true;

          if (err.status === 403) {
            this.error = JSON.parse(err.error).errorMessage;
            this.messageService.add({
              severity: 'error', detail: 'error message from server', summary: 'Error Occured... please try again'
            });
            // console.log(err);
          } else {
            this.error = 'Network Connection Error...';
            // console.log(err);
          }
        }
      );
  } // end class

  // /** */
  // ngAfterViewInit() {
  //   // We only want to detach the change detectors after change detection has been
  //   // performed for the first time
  //   this.cdr.detach();
  // }

  /*****
   *
   */
  update() {
    // Run change detection only for this component when update() method is called.
    this.cdr.detectChanges();
  }

}







