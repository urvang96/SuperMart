import { Observable } from 'rxjs/internal/Observable';
import { Order } from 'src/app/models/order';
import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  

  constructor(private db:AngularFireDatabase) { }

  placeOrder(order: Order|null, id: any){
    // if (id) return cartId;
    // else{
    //   let result = await this.creatCart();
    //   localStorage.setItem('cartId', result.key || '');
    //   return result.key;
    // }
    this.db.list('/orders/'+id+'/').push(order)
  }

  getOrders(id: any): Observable<SnapshotAction<Order>[]>{
    return this.db.list<Order>('/orders/'+id+'/').snapshotChanges();
  }
}
