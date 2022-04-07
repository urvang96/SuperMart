import { Observable } from 'rxjs/internal/Observable';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { take, map } from 'rxjs/operators';
import { Product } from '../models/product';
import { CartItem, ShoppingCart } from '../models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }
  
  addToCart(product: Product){
    this.updateProduct(product, 1);
  }

  removeFromCart(product: Product){
    this.updateProduct(product, -1);
  }

  async getCart(): Promise<Observable<ShoppingCart>>{
    let cartId = await this.getCartId() || "";
    return this.db.object<{[item:string] : { [productId:string] : CartItem}}>('/shopping-cart/'+ cartId).valueChanges()
    .pipe(map(val=> new ShoppingCart(val)));
  }

  private creatCart(){
    return this.db.list('/shopping-cart').push({dateCreated: new Date().getTime()});
  }

  private async getCartId(){
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    else{
      let result = await this.creatCart();
      localStorage.setItem('cartId', result.key || '');
      return result.key;
    }
  }

  private getItem(cart:string, prod:string | null): AngularFireObject<CartItem>{
    return this.db.object('/shopping-cart/' + cart + '/item/' + prod);
  }

  private async updateProduct(product: Product, change: number){
    let cartProduct: any;
    let cartId = await this.getCartId() || "";
    let item$ = this.getItem(cartId, product.key);
    item$.valueChanges().pipe(take(1)).subscribe(item=>{
      if(item){
        cartProduct = item;
        let newQuantity = cartProduct.quantity + change;
        if (newQuantity === 0) item$.remove();
        else item$.update({quantity: cartProduct.quantity + change});
      }
      else{
        item$.set({title: product.title,
          price: product.price,
          key: null,
          quantity: 1});
      }
    });
    }

    async emptyCart(){
      let cartId = await this.getCartId() || "";
      localStorage.removeItem('cartId');
      this.db.object('/shopping-cart/' + cartId).remove();
    }

}
  


