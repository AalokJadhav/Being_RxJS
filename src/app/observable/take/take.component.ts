import { Component, OnInit } from '@angular/core';
import { from, fromEvent, interval, Subscription, timer } from 'rxjs';
import { map, take, takeLast, takeUntil, takeWhile } from 'rxjs/operators';
import { DesignUtilityService } from 'src/app/services/design-utility.service';

@Component({
  selector: 'app-take',
  templateUrl: './take.component.html',
  styleUrls: ['./take.component.scss']
})
export class TakeComponent implements OnInit {


  subs4: any = Subscription;
  constructor(private _designutility: DesignUtilityService) { }
  randomNames = ['Ross', 'Rachel', 'Joey', 'Phoebe', 'Monica', 'Chandler']
  ngOnInit(): void {

    // Ex - 01 | Take
    const namesource = from(this.randomNames);
    namesource.pipe(
      take(5)
    )
      .subscribe
      (res => {
        console.log(res);
        this._designutility.print(res, 'elContainer1')
      });

    // Ex - 0 | Take Last
    const namesource1 = from(this.randomNames);
    namesource1.pipe(
      takeLast(5)
    )
      .subscribe
      (res => {
        console.log(res);
        this._designutility.print(res, 'elContainer2');
      });

    // Ex - 0 | Take Until
    const source = interval(1000);
    let condition1 = timer(6000);
    let condition2 = fromEvent(document, 'click')
    source.pipe(
      map(res => 'Number ' + res),
      takeUntil(condition1)
    )
      .subscribe
      (res => {
        console.log(res);
        this._designutility.print(res, 'elContainer3');
      });

    // Ex - 0 | Take While
    this.subs4 = source.pipe(
      takeWhile(x => x >= 4))
      .subscribe
      (res => {
        console.log(res);
        this._designutility.print(<any>res, 'elContainer4');
      });
  }

}
