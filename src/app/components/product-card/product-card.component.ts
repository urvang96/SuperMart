import { Observable } from 'rxjs/internal/Observable';
import { take } from 'rxjs/operators';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { compileDeclareDirectiveFromMetadata } from '@angular/compiler';
import { Product } from '../../models/product';
import { CartItem, ShoppingCart } from '../../models/shopping-cart';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product!: Product;
  @Input('cart') shoppingcart!: ShoppingCart;
  @Input('cartAction') cartAction: Boolean = true;

  constructor(private cart: ShoppingCartService) { 
    
  }

  ngOnInit() {
  }

  addToCart(){
    this.cart.addToCart(this.product);    
  }

}
