import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PostViewComponent } from './post-view/post-view.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { ProfileComponent } from './profile/profile.component';
import { MakePostComponent } from './make-post/make-post.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SurveyComponent } from './survey/survey.component';
import { SearchComponent } from './search/search.component';
import { AdminViewComponent } from './admin-view/admin-view.component';


import { ProfesionalComponent } from './bokings-folder/profesional/profesional.component';
import { TimeComponent } from './bokings-folder/time/time.component';
import { ServicesComponent } from './bokings-folder/services/services.component';
import { AdmonTimeComponent } from './bokings-folder/admon-time/admon-time.component';
import { CalendarComponent } from './bokings-folder/calendar/calendar.component';
import { ConfirmComponent } from './bokings-folder/confirm/confirm.component';
import { StatusComponent } from './status/status.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const routes: Routes = [
  {path: '', redirectTo: '/Login', pathMatch:'full'},
  {path: 'Home', component: HomeComponent},
  {path: 'Postview/:id', component: PostViewComponent},
  {path: 'Forget-password', component: ForgetPasswordComponent},
  {path: 'Recovery/:id/:code', component: RecoveryPasswordComponent},
  {path: 'Login', component: LoginRegisterComponent},
  {path: 'Profile/:id', component: ProfileComponent},
  {path: 'makePost/:id', component: MakePostComponent},
  {path: 'editProfile/:id', component: EditProfileComponent},
  {path: 'survey/:id', component: SurveyComponent},
  {path: 'search', component: SearchComponent},
  {path: 'admon/:id', component: AdminViewComponent},
  {path: 'Profesional', component: ProfesionalComponent },
  {path: 'Time', component: TimeComponent },
  {path: 'Services', component: ServicesComponent },
  {path: 'AdmonTime', component: AdmonTimeComponent },
  {path: 'calendar', component: CalendarComponent },
  {path: 'confirm', component: ConfirmComponent },
  {path: 'status', component: StatusComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostViewComponent,
    ForgetPasswordComponent,
    RecoveryPasswordComponent,
    LoginRegisterComponent,
    ProfileComponent,
    MakePostComponent,
    EditProfileComponent,
    SurveyComponent,
    SearchComponent,
    AdminViewComponent,
    ProfesionalComponent,
    TimeComponent,
    ServicesComponent,
    AdmonTimeComponent,
    StatusComponent,
    ConfirmComponent,
    CalendarComponent
    
    

    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes,{useHash:true}),
    ReactiveFormsModule
  ],
  exports:[RouterModule],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
