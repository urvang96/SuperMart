import { Product } from "./product";

export class CartItem{
    key: string | null;
    title: string | null;
    price: number;
    quantity: number;
    
    constructor(key: string|null, title: string|null, price:number, quantity:number){
        this.key = key;
        this.title = title;
        this.price = price;
        this.quantity = quantity;
    }

}

export class ShoppingCart{
    item :{ [productId:string] : CartItem} = {};

    constructor(private itemMap: {[item:string] : { [productId:string] : CartItem}} | null){
        if(itemMap){
            this.item = this.itemMap!.item;
        }
    }

    getTotalQuantity():number{
        let totalQuantity:number = 0;
        for(let data in this.item){
            let values = this.item[data];
            totalQuantity += values.quantity;
        }
        return totalQuantity;
    }

    getTotalPrice(){
        let totalPrice:number = 0;
        for(let data in this.item){
            let values = this.item[data];
            totalPrice += (values.quantity * values.price);
        }
        return totalPrice;
    }

    getQuantity(product:Product):number{
        let item;
        if(this.item && product.key)
            item = this.item[product.key];
        return item ? item.quantity : 0
    }

}