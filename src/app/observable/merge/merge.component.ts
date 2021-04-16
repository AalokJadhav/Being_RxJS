import { Component, OnInit } from '@angular/core';
import { interval, merge, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { DesignUtilityService } from 'src/app/services/design-utility.service';

@Component({
  selector: 'app-merge',
  templateUrl: './merge.component.html',
  styleUrls: ['./merge.component.scss']
})
export class MergeComponent implements OnInit {

  sub1: any = Subscription;

  constructor(private _designUtility: DesignUtilityService) { }

  ngOnInit(): void {
    const sourceTech = interval(500).pipe(map(v => `Tech video #${v + 1}`), take(5));
    const sourceComedy = interval(1000).pipe(map(v => `Comedy video #${v + 1}`), take(3));
    const sourceNews = interval(1500).pipe(map(v => `News video #${v + 1}`), take(4));

    const FinalObs = merge(sourceTech, sourceComedy, sourceNews);
    this.sub1 = FinalObs.subscribe(res => {
      this._designUtility.print(res, 'elContainer');
    });
  }

  ngOnDestroy() {
    this.sub1?.unsubscribe();
  }

}
