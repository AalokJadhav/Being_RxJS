import { Component, OnInit } from '@angular/core';
import { from, of } from 'rxjs';
import { map, mergeAll, mergeMap } from 'rxjs/operators';
import { DesignUtilityService } from 'src/app/services/design-utility.service';

@Component({
  selector: 'app-merge-map',
  templateUrl: './merge-map.component.html',
  styleUrls: ['./merge-map.component.scss']
})
export class MergeMapComponent implements OnInit {

  constructor(private _designUtility: DesignUtilityService) { }

  getData(data: string) {
    return of(data + ' Video uploaded');
  }

  ngOnInit(): void {
    const source = from(['Tech', 'Comedy', 'News']);

    // Ex - 01 | Map
    /*
        source.pipe(
          map(res => this.getData(res))
        ).subscribe(res => {
          // console.log(res);
          this._designUtility.print(res, 'elContainer1');
        });
    */
    // Two subscribe happen here
    source.pipe(
      map(res => this.getData(res))
    ).subscribe(res => res.subscribe(res2 => {
      // console.log(res2);
      this._designUtility.print(res2, 'elContainer1');
    }));



    // Ex - 02 | Map + MergeAll
    source.pipe(
      map(res => this.getData(res)),
      mergeAll()
    ).subscribe(res => {
      // console.log(res);
      this._designUtility.print(res, 'elContainer2');
    });

    // Ex - 03 | MergeMap
    source.pipe(
      mergeMap(res => this.getData(res))
    ).subscribe(res => {
      // console.log(res);
      this._designUtility.print(res, 'elContainer3');
    });

  }

}
