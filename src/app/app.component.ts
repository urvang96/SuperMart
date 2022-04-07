import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SuperMart';

  // constructor(private auth:UserService, private router: Router){
  //   this.auth.userName.subscribe(appUser => {
  //     if (appUser){
  //      let retUrl =  localStorage.getItem('returnUrl') || ''
  //      router.navigateByUrl(retUrl)
  //     }
  //   });
  // }
}
