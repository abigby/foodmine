import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/CartItem';
import { Food } from '../shared/models/Food';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = new Cart();
  private cartSubject:BehaviorSubject<Cart> = new BehaviorSubject<Cart>(this.cart);

  constructor() { }

  public addToCart(food:Food):void {
    let cartItem = this.cart.items
    .find((item) => item.food.id === food.id);

    if(cartItem) return;

    this.cart.items.push(new CartItem(food));
    this.setCartToLocalStorage();
  }

  public removeFromCart(foodId:string):void {
    this.cart.items = this.cart.items
    .filter((item) => item.food.id != foodId);
    this.setCartToLocalStorage();
  }

  public changeQuantity(foodId:string, quantity:number):void {
    let cartItem = this.cart.items.find((item) => item.food.id === foodId);

    if(!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this.setCartToLocalStorage();
  }

  public clearCart():void {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  public getCartObservable():Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  private setCartToLocalStorage():void {
    //sum of price
    this.cart.totalPrice = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);

    //sum of quantity
    this.cart.totalCount = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);

    this.cartSubject.next(this.cart);

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
  }

  private getCartFromLocalStorage():Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson): new Cart();
  }

  private removeCartLocalStorage():void {

  }
}
