import { Injectable } from '@angular/core';
import firebase from "firebase/app";
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database'
import { userInfo } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  userData: Observable<firebase.User | null>;
  userLoggedIn: boolean;

  constructor(private afAuth: AngularFireAuth, private router: Router, private route:ActivatedRoute, private db: AngularFireDatabase) { 
    this.userData= afAuth.authState;
    
    let name = localStorage.getItem('user');
    if (name) this.userLoggedIn = true;
    else this.userLoggedIn = false;
  }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || "";
    localStorage.setItem("returnUrl", returnUrl);

    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider).then((res: any) => {
      this.userData=res.user;
           
      if (this.userData){

        //store the user in database
        this.db.object('/users/'+ res.user.uid).update({
          name:res.user.displayName,
          email: res.user.email
        })

        //set the loggedin flag for routeguard(Temporary fix)
        this.userLoggedIn = true;
        localStorage.setItem('user', res.user.displayName);
        let url = localStorage.getItem('returnUrl') || "/";
        this.router.navigateByUrl(url);

      }
    });
  }

  signout(){
    this.afAuth.signOut().then((res: any) => {
      
      //Set the loggedinFLag and remove the user from localstorage
      this.userLoggedIn = false;
      localStorage.removeItem('user');
      this.router.navigate(['/']);
    });
  }

  get userName(){
      return this.userData;
    
  }
}
