import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  user = {};
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }
  
  saveUser () {
    return this.http.post('/api/adminRegister',this.user)
    .subscribe(res => {
      console.log(res);
    });
  }
}
