import { Injectable } from '@angular/core';
import { Food } from '../shared/models/Food';
import { sample_foods, sample_tags } from '../../data';
import { Tag } from '../shared/models/Tags';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL, FOOD_BY_ID_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  public foods: Array<Food> = new Array<Food>();

  constructor(
    private httpClient:HttpClient
  ) { }

  public getAll():Observable<Array<Food>> {
    return this.httpClient.get<Array<Food>>(FOODS_URL);
  }

  public getAllFoodsBySearchTerm(searchTerm:string):Observable<Array<Food>> {
    return this.httpClient.get<Array<Food>>(FOODS_BY_SEARCH_URL + "/" + searchTerm);
  }

  public getAllTags():Observable<Array<Tag>> {
    return this.httpClient.get<Array<Tag>>(FOODS_TAGS_URL);
  }

  public getAllFoodsByTag(tag:string):Observable<Array<Food>> {
    return tag === "All" ? this.getAll() : this.httpClient.get<Array<Food>>(FOODS_TAGS_URL + tag);
  }

  public getFoodById(foodId:string):Observable<Food> {
    return this.httpClient.get<Food>(FOOD_BY_ID_URL + foodId);
  }
}
