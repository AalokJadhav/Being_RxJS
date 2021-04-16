import { Component, OnDestroy, OnInit } from '@angular/core';
import { DesignUtilityService } from 'src/app/services/design-utility.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit, OnDestroy {
  userName: any;
  constructor(private _designUtility: DesignUtilityService) {
    this._designUtility.userName$.subscribe(res => {
      this.userName = res;
    })
  }

  ngOnInit(): void {
    this._designUtility.exclusive.next(true);
  }

  ngOnDestroy() {
    this._designUtility.exclusive.next(false);

  }

}
