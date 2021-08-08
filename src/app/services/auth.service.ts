import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {auth} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import{AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {User} from "../models/user.model";
// import { JwtHelperService } from '@auth0/angular-jwt'; public jwtHelper: JwtHelperService
import * as Firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
user$:Observable<User>;
message:"";
  constructor(private afAuth:AngularFireAuth, private afs:AngularFirestore, private router:Router) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user=>{
        if(user){
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        else{
          return of(null);
        }
      })
    )
  }
  // public isAuthenticated(): boolean {
  //   const token = localStorage.getItem('token');
  //   // Check whether the token is expired and return
  //   // true or false
  //   return !this.jwtHelper.isTokenExpired(token);
  // }

async Signin(email,password){


const credential = await this.afAuth.signInWithEmailAndPassword(email,password).catch((error)=>{
  this.message = error.message;

});
return this.router.navigate(['/admin']);



}
async Signout(){
  await this.afAuth.signOut();
  return this.router.navigate(['/login']);
}


async getUserData(uid){
  return this.afs.collection('users').doc(uid).get().toPromise();
}
canAccessAdmin(user:User):boolean{
const allowed =["admin"];
return this.checkAuth(user,allowed);
}
isPremium(user:User):boolean{
  const allowed =["admin","Premium"];
  return this.checkAuth(user,allowed);
  }
private checkAuth(user:User, allowedRoles: string[]):boolean{
if(!user) return false;
for (const role of allowedRoles){
 user.roles.forEach(erole => {
   if(erole===role ){
     return true
   }
 });
}
return false;
}
}
