import { Injectable } from '@angular/core';
import { Router, CanActivate } from "@angular/router";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate{

    constructor( private router: Router ){}

    canActivate(router:ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean>|Promise<boolean>|boolean {
       if(localStorage.getItem('token')){
           return true;
       } else {
        this.router.navigate(['/login']);
           return false;
       }
    }
    
}
