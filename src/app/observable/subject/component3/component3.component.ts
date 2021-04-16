import { Component, OnInit } from '@angular/core';
import { DesignUtilityService } from 'src/app/services/design-utility.service';

@Component({
  selector: 'app-component3',
  templateUrl: './component3.component.html',
  styleUrls: ['./component3.component.scss']
})
export class Component3Component implements OnInit {

  userName: any;
  constructor(private _designUtility: DesignUtilityService) {
    this._designUtility.userName$.subscribe(res => {
      this.userName = res;
    })
  }

  ngOnInit(): void {
    this._designUtility.exclusive.next(true);
  }
  onChange(uname1: string) {
    this._designUtility.setUserName(uname1);
  }

  ngOnDestroy() {
    this._designUtility.exclusive.next(false);

  }

}
