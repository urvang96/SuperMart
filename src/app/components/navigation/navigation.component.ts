import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{
  userName:any;
  constructor(private users: UserService) { 
  }

  async ngOnInit(){
    this.users.userName.subscribe(appUser => this.userName = appUser);
  }

  signout(){
    this.users.signout();
  }
}
