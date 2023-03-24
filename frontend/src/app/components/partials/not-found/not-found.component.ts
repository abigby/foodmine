import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  @Input()
  public visible:boolean = false;
  @Input()
  public notFoundMessage:string = "Nothing to see!";
  @Input()
  public resetLinkText:string = "Reset";
  @Input()
  resetLinkRoute:string = "/";

  constructor() { }

  public ngOnInit():void {

  }

}
