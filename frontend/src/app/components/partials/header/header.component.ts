import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { User } from 'src/app/shared/models/User';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public cartQuantity:number = 0;
  public user!:User;

  constructor(private cartService:CartService, private userService:UserService) {
    cartService.getCartObservable().subscribe(
      (newCart) => {
        this.cartQuantity = newCart.totalCount;
      }
    );

    this.userService.userObservable.subscribe(
      (newUser) => {
        this.user = newUser;
      }
    )
  }

  get isAuth() {
    return this.user.token;
  }

  public ngOnInit():void { }

  public logout() {
    this.userService.logout();
  }

}
