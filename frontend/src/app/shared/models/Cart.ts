 import { CartItem } from "./CartItem";

export class Cart {
  items: Array<CartItem> = new Array<CartItem>();
  totalPrice: number = 0;
  totalCount: number = 0;
}
