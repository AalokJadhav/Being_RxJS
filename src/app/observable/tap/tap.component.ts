import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DesignUtilityService } from 'src/app/services/design-utility.service';

@Component({
  selector: 'app-tap',
  templateUrl: './tap.component.html',
  styleUrls: ['./tap.component.scss']
})
export class TapComponent implements OnInit {

  subs1: any = Subscription;
  subs2: any = Subscription;
  myColor: string = '';
  constructor(private _designUtilityService: DesignUtilityService) { }

  ngOnInit(): void {
    const source = interval(1500);

    // Ex - 01
    const Arr = ['Ross', 'Rachel', 'Joey', 'Phoebe', 'Monica', 'Chandler'];
    this.subs1 = source.pipe(
      tap(res => {
        if (res === 4) {
          this.subs1?.unsubscribe();
        }
      }),
      map(res => Arr[res])
    ).subscribe((res) => {
      this._designUtilityService.print(res, 'elContainer1');
    });

    // Ex - 02
    const colors = ['Red', 'Green', 'Blue', 'grey', 'Pink', 'Purple', 'Orange'];
    this.subs2 = source.pipe(
      tap(res => {
        this.myColor = colors[res];
        // console.log(this.myColor);

        // console.log('tap => '+res);
        if (res === colors.length) {
          this.subs2?.unsubscribe();
        }
      }),
      map(res => colors[res])
    ).subscribe(res => {
      this.myColor = res;
      this._designUtilityService.print(res, 'elContainer2');
    });
  }

  ngOnDestroy() {
    this.subs1?.unsubscribe();
    this.subs2?.unsubscribe();
  }

}
