import { ProductService } from '../../services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy{

  // products:any[];
  products: Product[]=[];
  headers: string[] = ['Title', 'Price', 'Edit'];
  dataSource = new MatTableDataSource(this.products);
  subscription: Subscription;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(private data:ProductService) {
    this.products = []
    this.subscription = this.data.getAllProducts().subscribe(prod => {
      prod.forEach(action => {
        const value:Product|null = action.payload.val();
        const id = action.payload.key;
        if(value)
          this.products.push({key:id, 
                              title:value.title, 
                              price:value.price, 
                              catagory:value.catagory, 
                              image:value.image});
      })
      this.dataSource = new MatTableDataSource(this.products);
    });
  }

  ngOnInit(){
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
