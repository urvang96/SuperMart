import { ProductService } from '../../services/product.service';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { CartItem, ShoppingCart } from '../../models/shopping-cart';
import { Product } from '../../models/product';
import { switchMap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

export interface ShoppingData{
  id: string;
  productData:Product;
  itemData: CartItem;
}

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  shoppingCart!: ShoppingCart;
  shoppingData: { productId:string, productData:Product}[]= []
  displayedColumns = ['Product', 'Price', 'Quantity']
  dataSource = new MatTableDataSource(this.shoppingData);
  totalPrice:number = 0;
  totalQuantity:number = 0;
  
  constructor(private cart:ShoppingCartService, private product:ProductService) {
    
   }

  async ngOnInit(){
    // this.cart$ = await this.cart.getCart();
    (await this.cart.getCart())
    .pipe(
      switchMap(data => {
      this.shoppingCart=data;
      this.totalPrice = this.shoppingCart.getTotalPrice();
      this.totalQuantity = this.shoppingCart.getTotalQuantity();
      return this.product.getAllProducts();
    })
    ).subscribe(values=>{
      this.shoppingData = []
      values.forEach(data=> {
        if(this.totalQuantity && data.payload.key && this.shoppingCart.item[data.payload.key]){
          let vals = data.payload.val();
          let id = data.payload.key;
          if(vals){
            let prodVal = {key:id, title:vals.title, catagory:vals.catagory, image:vals.image, price:vals.price}
          this.shoppingData.push({productId:id, productData:prodVal})}
        }
      })
      this.dataSource = new MatTableDataSource(this.shoppingData)
    });
  }

}

