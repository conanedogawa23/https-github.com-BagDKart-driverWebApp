import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { routing } from "./app.routes";
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/index';
import { AdminLoginComponent } from './admin-login/index';
import { AuthGuard } from './authTokenManage/index';
import { AuthenticationService } from './services/index';
import { HomeComponent } from './home/index';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    AdminLoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
