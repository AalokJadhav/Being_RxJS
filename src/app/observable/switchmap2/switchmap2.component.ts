import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { concatMap, debounceTime, map, distinctUntilChanged, filter, pluck } from 'rxjs/operators';
import { Search } from 'src/app/interface/search.interface';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-switchmap2',
  templateUrl: './switchmap2.component.html',
  styleUrls: ['./switchmap2.component.scss']
})
export class Switchmap2Component implements AfterViewInit {


  @ViewChild('searchForm') searchForm!: NgForm;
  searchResults: Search | any;
  searchResultsCount!: number;

  constructor(private _searchService: SearchService, private _loadingBar: LoadingBarService) { }


  ngAfterViewInit(): void {
    // this._searchService.getSearches('rxjs').subscribe(res => {
    //   console.log(res);
    // });
    const formValue = this.searchForm.valueChanges;
    formValue!.pipe(
      // map(data => data['searchTerm'])
      filter(() => this.searchForm.valid!),
      pluck('searchTerm'),
      debounceTime(500),
      distinctUntilChanged(),
      concatMap(data => this._searchService.getSearches(data.trim()))
    ).subscribe(res => {
      console.log(res);
      this._loadingBar.start();
      this.searchResults = res;
      // console.log('count =>', Object.keys(res).length);
      this.searchResultsCount = Object.keys(res).length;
      this._loadingBar.complete();
    });
  }


}
