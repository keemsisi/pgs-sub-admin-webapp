import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import { AdminDashBoardContainerComponent } from './admin-dash-board-container/admin-dash-board-container.component';
import {CustomHttpService} from './Services/custom-http-service-service.service';
import {AdminDashBoardComponent} from './admin-dash-board/admin-dash-board.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatInputModule, MatCardModule, MatTableModule, MatDividerModule, MatAccordion, MatExpansionModule
} from '@angular/material';



import {CacheService} from './Services/cache-service-service.service';
import {
  DataTableModule, FileUploadModule, DialogModule,
  ButtonModule, ConfirmDialogModule,  ToggleButtonModule,
  ConfirmationService , GrowlModule, CalendarModule, MessageService, InputTextModule

} from 'primeng/primeng';

import {MessagesModule} from 'primeng/messages';
import {ToastModule} from 'primeng/toast';


import {LoginGaurdGuard} from './Gaurds/login-gaurd.guard';
import { AllApplicantsComponent } from './all-applicants/all-applicants.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { UserViewMoreDetailsComponent } from './user-view-more-details/user-view-more-details.component';
import { MetricsComponent } from './metrics/metrics.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PreviewCvComponent } from './preview-cv/preview-cv.component';
import { ViewGradingResultsComponent } from './view-grading-results/view-grading-results.component';




const appRoute: Routes = [
  {path: '', redirectTo: '/adminlogin', pathMatch: 'full' },
  {path : 'adminlogin', component: AdminLoginComponent},
  {path : 'dashboard', component: AdminDashBoardContainerComponent, canActivate : [LoginGaurdGuard] ,
  children : [
    {path: 'admindashboard', component: AdminDashBoardComponent, canActivate: [LoginGaurdGuard] },
    {path: 'users', component: AllUsersComponent, canActivate: [LoginGaurdGuard] },
    {path: 'view-details/:username', component: UserViewMoreDetailsComponent, canActivate: [LoginGaurdGuard] },
    {path: 'metrics', component: MetricsComponent, canActivate: [LoginGaurdGuard] },
    {path: 'view-grading-results/:username', component: ViewGradingResultsComponent, canActivate: [LoginGaurdGuard] }
  ]},
  {path: '**', component: PagenotfoundComponent, canActivate: [LoginGaurdGuard] }
];




@NgModule({
  declarations: [

    AppComponent,
    AdminLoginComponent,
    AdminDashBoardContainerComponent,
    AdminDashBoardComponent,
    AllApplicantsComponent,
    AllUsersComponent,
    UserViewMoreDetailsComponent,
    MetricsComponent,
    PagenotfoundComponent,
    PreviewCvComponent,
    ViewGradingResultsComponent

  ],

  imports: [
    BrowserModule, HttpClientModule, ToggleButtonModule, 
    FileUploadModule, BrowserAnimationsModule, 
    FormsModule, ReactiveFormsModule,
    RouterModule.forRoot(appRoute), DataTableModule, GrowlModule,
    DialogModule, ButtonModule, ConfirmDialogModule, CalendarModule , 
    MessagesModule , ToastModule, InputTextModule, 
    ReactiveFormsModule,MatInputModule, MatCardModule,MatTableModule , MatDividerModule , MatExpansionModule
  ],

  providers: [ConfirmationService, CustomHttpService, CacheService, LoginGaurdGuard , MessageService ],
  bootstrap: [AppComponent]


}) 
export class AppModule { }
