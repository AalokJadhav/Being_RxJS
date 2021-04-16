import { Component, OnInit } from '@angular/core';
import { interval, Subscription, timer } from 'rxjs';
import { DesignUtilityService } from 'src/app/services/design-utility.service';

@Component({
  selector: 'app-interval',
  templateUrl: './interval.component.html',
  styleUrls: ['./interval.component.scss']
})
export class IntervalComponent implements OnInit {

  Msg: any;
  Msg1: any;
  videosubscription: any = Subscription
  videosubscription1: any = Subscription

  constructor(private _designutility: DesignUtilityService) { }

  ngOnInit(): void {

    const broadcastVideos = interval(1000);

    //  timer(interval, delay)
    const broadcastVideos1 = timer(5000, 1000);


    this.videosubscription = broadcastVideos.subscribe(res => {
      console.log(res);
      this.Msg = 'Video ' + res
      this._designutility.print(this.Msg, 'elContainer1');
      this._designutility.print(this.Msg, 'elContainer2');
      this._designutility.print(this.Msg, 'elContainer3');

      if (res >= 3) {
        this.videosubscription.unsubscribe()
      }
    })


    this.videosubscription1 = broadcastVideos1.subscribe(res => {
      console.log(res);
      this.Msg1 = 'Video ' + res
      this._designutility.print(this.Msg1, 'elContainer4');
      this._designutility.print(this.Msg1, 'elContainer5');
      this._designutility.print(this.Msg1, 'elContainer6');

      if (res >= 5) {
        this.videosubscription1.unsubscribe()
      }
    })

  }

}
