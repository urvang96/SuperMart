import { UserService } from './../../services/user.service';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { OrderService } from '../../services/order.service';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { Order } from 'src/app/models/order';
import { Router } from '@angular/router';
import firebase from "firebase/app";

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit{

  shoppingCart: ShoppingCart = new ShoppingCart(null);
  orderDetails: Order | null = null;
  userData!: firebase.User | null;
  
  formObj = new FormGroup({
    name : new FormControl("", Validators.required),
    address : new FormControl("", Validators.required),
    city : new FormControl("", Validators.required),
    pincode : new FormControl("", Validators.required),
    contact : new FormControl("", Validators.required),
  });

  constructor(private orders:OrderService, 
    private cart:ShoppingCartService, 
    private user:UserService,
    private users: UserService, 
    private router: Router ) { }

  onSubmit(form: FormGroup){
    if(this.userData){
      let today = new Date(); 
      this.orderDetails = {
        name: form.value.name,
        address: form.value.address,
        cart: this.shoppingCart,
        contact: form.value.contact,
        date: ""+today.getDate()+"/"+today.getMonth()+"/"+today.getFullYear()
      }
      this.orders.placeOrder(this.orderDetails, this.userData.uid)
      this.cart.emptyCart();
      this.router.navigate(['/order-success'])
    }
    
  }

  get form() { 
    return this.formObj.controls; }

  async ngOnInit(){
    this.users.userName.subscribe(appUser => this.userData = appUser);
    (await this.cart.getCart()).pipe(take(1)).subscribe(data=> this.shoppingCart=data)
  }
}
