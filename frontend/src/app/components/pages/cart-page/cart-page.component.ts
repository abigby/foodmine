import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/CartItem';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  public cart!: Cart;

  constructor(private cartService:CartService) {
    this.cartService.getCartObservable().subscribe(
      (cart)=> {
        this.cart = cart;
      }
    );
  }

  public ngOnInit():void {}

  public removeFromCart(cartItem:CartItem):void {
    this.cartService.removeFromCart(cartItem.food.id);
  }

  public changeQuantity(cartItem:CartItem, quantityInString:string):void {
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.food.id, quantity);
  }
}
