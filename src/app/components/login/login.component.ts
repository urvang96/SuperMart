import { UserService } from './../../services/user.service';
import { ComponentFixture } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  userName:any;
  constructor(private users: UserService) { 
  }

  login(){
    this.users.login();
  }
}
