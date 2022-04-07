import { switchMap } from 'rxjs/operators';
import { UserService } from './../../services/user.service';
import { OrderService } from './../../services/order.service';
import { Order } from 'src/app/models/order';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import firebase from "firebase/app";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: {id:string, data:Order}[] = []
  displayedColumns = ['Date', 'Name', 'View']
  dataSource = new MatTableDataSource(this.orders);
  userData!: firebase.User | null;
  
  constructor(private oderDetails:OrderService, private users:UserService) { }

  ngOnInit(): void {
    this.users.userName.pipe(switchMap(appUser => {
      this.userData = appUser;
      return this.oderDetails.getOrders(this.userData?.uid)
    })
    ).subscribe(data=> {
      data.forEach(values=>{
        const key = values.payload.key;
        const value = values.payload.val()
        if (key && value)
          this.orders.push({id:key, data:value})
      }
      )
      this.dataSource = new MatTableDataSource(this.orders); 
    })
  }

}
