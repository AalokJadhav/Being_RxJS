import { Component, OnInit } from '@angular/core';
import { from, of } from 'rxjs';
import { concatMap, delay, map, mergeMap } from 'rxjs/operators';
import { DesignUtilityService } from 'src/app/services/design-utility.service';

@Component({
  selector: 'app-concat-map',
  templateUrl: './concat-map.component.html',
  styleUrls: ['./concat-map.component.scss']
})
export class ConcatMapComponent implements OnInit {

  constructor(private _designUtility: DesignUtilityService) { }

  getData(data: string) {
    return of(data + ' Video uploaded').pipe(delay(2000));
  }

  ngOnInit(): void {
    const source = from(['Tech', 'Comedy', 'News']);

    // Ex - 01 | Map

    source.pipe(
      map(res => this.getData(res))
    ).subscribe(res => {
      // console.log(res);
      this._designUtility.print(res, 'elContainer1');
    });

    /*
       source.pipe(
         map(res => this.getData(res))
       ).subscribe(res => res.subscribe(res2 => {
         console.log(res2);
       }));
     */

    // Ex - 02 | Map + ConcatAll
    // Ex - 02 | MergeMap
    source.pipe(
      mergeMap(res => this.getData(res)),
    ).subscribe(res => {
      // console.log(res);
      this._designUtility.print(res, 'elContainer2');
    });

    /*
    source.pipe(
      map(res => this.getData(res)),
      concatAll()
    ).subscribe(res => {
      console.log(res);
      this._designUtility.print(res, 'elContainer2');
    });
    */

    // Ex - 03 | ConcatMap

    source.pipe(
      concatMap(res => this.getData(res)),
    ).subscribe(res => {
      // console.log(res);
      this._designUtility.print(res, 'elContainer3');
    });
  }

}
