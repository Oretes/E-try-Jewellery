import { Injectable } from '@angular/core';
import {CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot, Router} from '@angular/router';
import{Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {tap,map,take} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth:AuthService,private router:Router, private _snackBar: MatSnackBar) { }
  canActivate(
    next:ActivatedRouteSnapshot,
    State:RouterStateSnapshot):Observable<boolean>{
      return this.auth.user$.pipe(
        take(1),
        map(user => user && user.roles.includes("admin")? true: false),
        tap(isAdmin =>{
          if(!isAdmin){
            this._snackBar.open("You do not have enough permissions to view this page!", "Okay", {
              duration: 3000,
            });
          this.router.navigate(['/login']);
          }
        })
      );
  }
}
