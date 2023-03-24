import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

  constructor() { }

  @Input()
  title!:string;

  @Input()
  public margin?:string = '1rem 0 1rem 0.2rem';

  @Input()
  public fontSize?:string = '1.7rem';

  public ngOnInit():void {

  }

}
