import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public searchTerm:string = '';

  constructor(private activatedRoute:ActivatedRoute, private router:Router) {
    activatedRoute.params.subscribe(
      (params) => {
        if(params.searchTerm) this.searchTerm = params.searchTerm;
      }
    );
  }

  public ngOnInit():void {

  }

  public search(term:string):void {
    if(term) this.router.navigateByUrl('/search/' + term);
  }

}
