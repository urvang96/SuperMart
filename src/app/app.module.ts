import { ProductService } from './services/product.service';
import { RouteGuardService } from './services/route-guard.service';
import { RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoginComponent } from './components/login/login.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { HomeComponent } from './components/home/home.component';
import { environment } from 'src/environments/environment';
import { UserService } from './services/user.service';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AppMaterialModule } from './app-material.module';
import { ProductCardComponent } from './components/product-card/product-card.component'
import { ShoppingCartService } from './services/shopping-cart.service';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { OrderService } from './services/order.service';
import { FileuploadComponent } from './components/fileupload/fileupload.component';
import { FileuploadService } from './services/fileupload.service';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    OrdersComponent,
    ProductsComponent,
    CheckOutComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    OrderSuccessComponent,
    ShoppingCartComponent,
    HomeComponent,
    ProductFormComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    FileuploadComponent,
    OrderSummaryComponent
  ],
  imports: [
    AppRoutingModule,
    NgbModule,
    AppMaterialModule,
    AngularFireStorageModule,
    RouterModule.forRoot([
      {path:'', component: ProductsComponent},
      {path:'order-success', component: OrderSuccessComponent},
      {path:"products", component: ProductsComponent},
      {path:"login", component: LoginComponent},
      {path:"admin/orders", component: AdminOrdersComponent,canActivate:[RouteGuardService]},
      {path:"checkout", component: CheckOutComponent, canActivate:[RouteGuardService]},
      {path:"shopping-cart", component: ShoppingCartComponent,canActivate:[RouteGuardService]},
      {path:"my/orders", component: OrdersComponent,canActivate:[RouteGuardService]},
      {path:"orders/:id", component: OrderSummaryComponent,canActivate:[RouteGuardService]},
      {path:"admin/products/new", component: ProductFormComponent},
      {path:"admin/products/:id", component: ProductFormComponent},
      {path:"admin/products", component: AdminProductsComponent,canActivate:[RouteGuardService]}
    ]),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [UserService, 
              RouteGuardService, 
              ProductService, 
              ShoppingCartService,
              OrderService,
              FileuploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
