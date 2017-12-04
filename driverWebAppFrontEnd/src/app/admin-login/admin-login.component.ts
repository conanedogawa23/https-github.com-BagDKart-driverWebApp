import { Component, OnInit } from '@angular/core';
// import { Http, Headers, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/index';



@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
  moduleId: module.id
})

export class AdminLoginComponent implements OnInit {

  adminValues: any = {};
  loading = false;
  error = '';

  constructor(private http: HttpClient, private router: Router, private authenticationService: AuthenticationService) { }

  //private http:HttpClient,private router:Router, private authenticationService: AuthenticationService
  ngOnInit() {
    // this.authenticationService.logout();
  }

  login(){
    this.loading = true;
    this.authenticationService.login(this.adminValues.username, this.adminValues.password)
    .subscribe(result => {
      if(result == true) {
        this.router.navigate(['/']);
      } else {
        console.log(this.adminValues.username,this.adminValues.password);
        this.error = 'Username and password is incorrect';
        this.loading = false;
      }
      
    });
  }
}
