import { Component, OnInit } from '@angular/core';
import { from, of } from 'rxjs';
import { concatMap, delay, map, mergeMap, switchAll, switchMap } from 'rxjs/operators';
import { DesignUtilityService } from 'src/app/services/design-utility.service';

@Component({
  selector: 'app-switchmap',
  templateUrl: './switchmap.component.html',
  styleUrls: ['./switchmap.component.scss']
})
export class SwitchmapComponent implements OnInit {

  constructor(private _designUtility: DesignUtilityService) { }

  getData(data: string) {
    return of(data + ' Video uploaded').pipe(delay(1000));
  }

  ngOnInit(): void {
    const source = from(['Tech', 'Comedy', 'News']);

    // Ex - 01 | Map
    // source.pipe(
    //   map(res => this.getData(res))
    // ).subscribe(res => {
    //   this._designUtility.print(res, 'elContainer1');
    // });

    source.pipe(
      map(data => this.getData(data))
    ).subscribe(res => res.subscribe(res2 => {
      this._designUtility.print(res2, 'elContainer1');
    }));

    // Ex - 02 | Map + SwitchAll
    source.pipe(
      map(data => this.getData(data)),
      switchAll()
    ).subscribe(res => {
      this._designUtility.print(res, 'elContainer2');
    });

    // // Ex - 03 | SwitchMap
    source.pipe(
      switchMap(data => this.getData(data))
    ).subscribe(res => {
      // console.log(res);
      this._designUtility.print(res, 'elContainer3');
    });

    // Ex - 04 | MergeMap
    source.pipe(
      mergeMap(data => this.getData(data))
    ).subscribe(res => {
      this._designUtility.print(res, 'elContainer4');
    });

    // Ex - 05 | ConcatMap
    source.pipe(
      concatMap(data => this.getData(data)),
    ).subscribe(res => {
      this._designUtility.print(res, 'elContainer5');
    });

  }


}
