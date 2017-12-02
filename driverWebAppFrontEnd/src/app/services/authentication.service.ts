import { Injectable } from "@angular/core";
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { ReturnStatement } from "@angular/compiler/src/output/output_ast";
import 'rxjs/add/operator/map';
import { Router } from "@angular/router/src/router";

@Injectable()

export class AuthenticationService {
    public token: string;
    value = <any>{};
    constructor(private http: Http) {
        // set token if saved in local storage
        var authToken = JSON.parse(localStorage.getItem('token'));
        this.token = authToken && authToken.token;
    }
    // Observable<boolean>
    login(username:string, password:string): Observable<boolean>{
        this.value.username = username;
        this.value.password = password;
        if(username){
        console.log(`${username} ${password} in auth service`);
            return this.http.post('/api/adminLogin', this.value)
            .map((response: Response)=> {
                if(Response) {
                    console.log(`${username} ${password} response sent`);
                    console.log(response.json());
                    let token = response.json() && response.json().token;            
                    if(token){
                        this.token = token;
                        console.log(`${username} ${password} if token is present`);
                        localStorage.setItem('token', JSON.stringify({aUname: username, token: token}));
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    console.log("no response");
                    return false;
                }
            });
        
        // return 
        // .map((response: Response)=> {
        //     let token = response.json() && response.json().token;

        //     if(token){
        //         this.token = token;

        //         localStorage.setItem('token', JSON.stringify({aUname: username, token: token}));

        //         return true;
        //     } else {
        //         return false;
        //     }
        // });
        }
    }  

    logout(): void{
        this.token = 'none'||null;

        localStorage.removeItem('token');
    }
}