import { ShoppingCartService } from './../../services/shopping-cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ShoppingCart } from '../../models/shopping-cart';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {
  @Input('product') product!: Product;
  @Input('cart') shoppingcart!: ShoppingCart;
  
  constructor(private cart: ShoppingCartService) {}

  ngOnInit(): void {
  }

  addToCart(product: Product){
    this.cart.addToCart(product);
  }

  removeFromCart(product: Product){
    this.cart.removeFromCart(product);
  }

}
