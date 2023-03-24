import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/shared/models/Tags';
import { FoodService } from '../../../services/food.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  public tags?:Array<Tag> = new Array<Tag>();

  constructor(private foodService:FoodService) {
    foodService.getAllTags().subscribe(
      (serverTags)=> {
        this.tags = serverTags;
      }
    );
  }

  public ngOnInit():void {

  }

}
