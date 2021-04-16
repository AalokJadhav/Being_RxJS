import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DesignUtilityService } from 'src/app/services/design-utility.service';

@Component({
  selector: 'app-component1',
  templateUrl: './component1.component.html',
  styleUrls: ['./component1.component.scss']
})
export class Component1Component implements OnInit {

  userName: any;
  sub1: any = Subscription;

  constructor(private _designUtility: DesignUtilityService) {
    this.sub1 = this._designUtility.userName$.subscribe((res: string) => {
      this.userName = res;
    });
  }

  ngOnInit(): void { }

  onChange(uname1: string) {
    this._designUtility.setUserName(uname1);
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

}
