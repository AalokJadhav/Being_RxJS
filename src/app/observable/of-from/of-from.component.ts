import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { from, of } from 'rxjs';
import { DesignUtilityService } from 'src/app/services/design-utility.service';

@Component({
  selector: 'app-of-from',
  templateUrl: './of-from.component.html',
  styleUrls: ['./of-from.component.scss']
})
export class OfFromComponent implements OnInit {

  obsMSg: any;
  constructor(private _designutility: DesignUtilityService) { }

  ngOnInit(): void {

    // Of
    const obs1 = of('Ross', 'Rachel', 'Joey');
    obs1.subscribe(res => {
      console.log(res);
      this._designutility.print(res, 'elContainer')
    });

    const obs2 = of({ a: 'Ross', b: 'Rachel', c: 'Joey' });
    obs2.subscribe(res => {
      this.obsMSg = res;
      // console.log(res);
      // this._designutility.print(res, 'elContainer')
    });

    // From  - Array
    let Arr = ['Ross', 'Rachel', 'Joey']
    const obs3 = from(Arr)
    obs3.subscribe(res => {
      // console.log(res);
      this._designutility.print(res, 'elContainer3')
    });

    // From - Promise
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve('Promise Resolved..!');
      }, 3000);
    });
    const obs4: any = from(promise);
    obs4.subscribe((res: string) => {
      console.log('From Promise =>', res);
      this._designutility.print(res, 'elContainer4')
    });

    // From - String

    const obs5: any = from('Alok Jadhav');
    obs5.subscribe((res: string) => {
      console.log('From String =>', res);
      this._designutility.print(res, 'elContainer5')
    });
  }

}
