import { ShoppingCart } from "./shopping-cart";

export interface Order{
    name: string;
    address: string;
    cart: ShoppingCart;
    contact: string;
    date: string;
  }