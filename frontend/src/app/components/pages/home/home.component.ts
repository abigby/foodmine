  import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Food } from 'src/app/shared/models/Food';
import { FoodService } from '../../../services/food.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public foods:Array<Food> = new Array<Food>();

  constructor(private foodService:FoodService, private activatedRoute:ActivatedRoute) {
    let foodsObservable:Observable<Array<Food>>;
    activatedRoute.params.subscribe(
      (params)=> {
        if(params.searchTerm) {
          foodsObservable = this.foodService.getAllFoodsBySearchTerm(params.searchTerm);
        } else if(params.tag) {
          foodsObservable = this.foodService.getAllFoodsByTag(params.tag);
        }
        else {
          foodsObservable = this.foodService.getAll();
        }

        foodsObservable.subscribe(
          (serverFoods) => {
            this.foods = serverFoods;
          });
      }
    );
   }

  public ngOnInit():void { }

}
