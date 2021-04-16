import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { DesignUtilityService } from 'src/app/services/design-utility.service';

@Component({
  selector: 'app-from-event',
  templateUrl: './from-event.component.html',
  styleUrls: ['./from-event.component.scss']
})
export class FromEventComponent implements OnInit, AfterViewInit {

  @ViewChild('addBtn') addBtn!: ElementRef;

  constructor(private _designutility: DesignUtilityService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    let count = 1
    fromEvent(this.addBtn.nativeElement, 'click').subscribe(res => {
      let countVal = 'video ' + count++
      console.log(countVal);
      this._designutility.print(countVal, 'elContainer1');
      this._designutility.print(countVal, 'elContainer2');
    })
  }

}
