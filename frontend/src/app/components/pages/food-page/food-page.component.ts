import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/shared/models/Food';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.scss']
})
export class FoodPageComponent implements OnInit {

  public food!:Food;

  constructor(
    private activatedRoute:ActivatedRoute,
    private foodService:FoodService,
    private cartService:CartService,
    private router:Router) {

    activatedRoute.params.subscribe(
      (params) => {
        if(params.id) {
          foodService.getFoodById(params.id).subscribe(
            (serverFood) => {
              this.food = serverFood;
            }
          );
        }
      }
    );

  }

  public ngOnInit():void { }

  public addToCart():void {
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }

}
