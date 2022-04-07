import { ShoppingCartService } from './../../services/shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  catagoryList$: any;
  products:any[]; //Check how to use product interface rather than any
  filteredList:Product[];
  cartData$!: Observable<ShoppingCart>;

  constructor(private data:ProductService, private route:ActivatedRoute, private cart:ShoppingCartService) {
    this.catagoryList$ = this.data.getCatagories();
    this.products = [];
    this.filteredList = this.products;
   }

  async ngOnInit() {
    this.cartData$ = await this.cart.getCart();
    this.populateProducts();
  }

  private populateProducts(){

    this.data.getAllProducts()
      .pipe(
        switchMap(prods=>{ 
          this.products = prods;
          return this.route.queryParamMap;
        })
      )
      .subscribe(filter=>{
        this.filteredList = [];
        const filterCatagory = filter.get('catagory');
        this.products.forEach(data=>{
          const productData = data.payload.val();
          if (!filterCatagory)
            this.filteredList.push({key:data.payload.key, 
                                    title:productData.title, 
                                    price:productData.price, 
                                    image:productData.image, 
                                    catagory:productData.catagory});
          else
            if(filterCatagory==productData.catagory)
            this.filteredList.push({key:data.payload.key, 
                                    title:productData.title, 
                                    price:productData.price, 
                                    image:productData.image, 
                                    catagory:productData.catagory});
        });
      });
  }

}

