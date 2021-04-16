import { Component, OnInit } from '@angular/core';
import { concat, interval, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { DesignUtilityService } from 'src/app/services/design-utility.service';

@Component({
  selector: 'app-concat',
  templateUrl: './concat.component.html',
  styleUrls: ['./concat.component.scss']
})
export class ConcatComponent implements OnInit {

  sub1: any = Subscription;

  constructor(private _designUtility: DesignUtilityService) { }

  ngOnInit(): void {
    const sourceTech = interval(1000).pipe(map(v => `Tech video #${v + 1}`), take(5));
    const sourceComedy = interval(1000).pipe(map(v => `Comedy video #${v + 1}`), take(3));
    const sourceNews = interval(1000).pipe(map(v => `News video #${v + 1}`), take(4));

    const FinalObs = concat(sourceTech, sourceComedy, sourceNews);
    this.sub1 = FinalObs.subscribe(res => {
      console.log(res);
      this._designUtility.print(res, 'elContainer');
    });
  }

  ngOnDestroy() {
    this.sub1?.unsubscribe();
  }

}
