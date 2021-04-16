import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-debouncetime',
  templateUrl: './debouncetime.component.html',
  styleUrls: ['./debouncetime.component.scss']
})
export class DebouncetimeComponent implements AfterViewInit {

  @ViewChild('myInput1', { static: true })
  myInput1!: ElementRef;
  @ViewChild('myInput2', { static: true })
  myInput2!: ElementRef;
  reqData1: any = null;
  reqData2: any = null;
  constructor(private _loadingBar: LoadingBarService) {

  }

  ngAfterViewInit(): void {
    // const state = this._loadingBar.useRef('router');

    const searchTerm1 = fromEvent<any>(this.myInput1.nativeElement, 'keyup').pipe(
      map(event => event.target.value),
      debounceTime(500)
    );
    searchTerm1.subscribe(res => {
      console.log(res);
      this.reqData1 = res;
      this._loadingBar.start();

      setTimeout(() => {
        this.reqData1 = null;
        this._loadingBar.stop();
      }, 1000);
    });

    const searchTerm2 = fromEvent<any>(this.myInput2.nativeElement, 'keyup').pipe(
      map(event => event.target.value),
      debounceTime(500),
      distinctUntilChanged()
    );
    searchTerm2.subscribe(res => {
      console.log(res);
      this.reqData2 = res;
      this._loadingBar.start();

      setTimeout(() => {
        this.reqData2 = null;
        this._loadingBar.stop();
      }, 1000);
    });
  }

}
