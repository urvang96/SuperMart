import firebase from "firebase/app";
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterModule, RouterStateSnapshot } from '@angular/router';
import { catchError, map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { Observable, of } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private auth: UserService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot){
    if (this.auth.userLoggedIn)
      return true;
    else{
      this.router.navigate(['/login'], {queryParams:{returnUrl:state.url}});
      return false;
    }
  };

}
