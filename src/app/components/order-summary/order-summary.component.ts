import { CartItem } from './../../models/shopping-cart';
import { UserService } from './../../services/user.service';
import { OrderService } from './../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { switchMap } from 'rxjs/operators';
import firebase from "firebase/app";

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  orderData!: Order;
  cartData: CartItem[] = [];
  orderId:string|null = null;
  userData!: firebase.User | null;
  
  constructor(private orders:OrderService, private user:UserService, private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.orderId = this.route.snapshot.paramMap.get('id')
    if (this.orderId){
      this.user.userName.pipe(switchMap(appUser => {
        this.userData = appUser;
        return this.orders.getOrders(this.userData?.uid)
      })
      ).subscribe(data=> {
        data.forEach(values=>{
          const key = values.payload.key;
          const value = values.payload.val();
          if (key==this.orderId && value){
            this.orderData = value;
            for(let details in value.cart.item){
              this.cartData.push(value.cart.item[details])
            }
          }
        })
      })
    }
  }

}
