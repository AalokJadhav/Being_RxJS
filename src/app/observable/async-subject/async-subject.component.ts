import { Component, OnInit } from '@angular/core';
import { DesignUtilityService } from 'src/app/services/design-utility.service';

@Component({
  selector: 'app-async-subject',
  templateUrl: './async-subject.component.html',
  styleUrls: ['./async-subject.component.scss']
})
export class AsyncSubjectComponent implements OnInit {

  asyncVideoEmit: any;
  constructor(private _designUtility: DesignUtilityService) { }

  ngOnInit(): void {
    this._designUtility.asyncVideoEmit.subscribe(res => {
      this.asyncVideoEmit = res;
    });
  }


  onAddVideo(video: string) {
    console.log(video);
    this._designUtility.asyncVideoEmit.next(video);
  }

  onComplete() {
    this._designUtility.asyncVideoEmit.complete();
  }

  ngOnDestroy() {

  }

}
