import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db:AngularFireDatabase) { }

  getCatagories(){
    return this.db.list('/catagories').valueChanges();
  }

  save(product: any){
    this.db.list('/products').push(product);
  }

  getAllProducts(): Observable<SnapshotAction<Product>[]>{
    return this.db.list<Product>('/products').snapshotChanges();
  }

  getProduct(productId: string): Observable<Product | null>{
    return this.db.object<Product>('/products/'+ productId).valueChanges();
  }

  updateProduct(productId:string, product:any){
    this.db.object('/products/'+productId).update(product);
  }

  delete(id:string | null){
    this.db.object('/products/'+id).remove();
  }
}
