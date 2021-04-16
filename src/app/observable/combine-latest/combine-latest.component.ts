import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { combineLatest, forkJoin, fromEvent, zip } from 'rxjs';
import { map, pluck, take, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-combine-latest',
  templateUrl: './combine-latest.component.html',
  styleUrls: ['./combine-latest.component.scss']
})
export class CombineLatestComponent implements OnInit {

  nameSource = ['Ross', 'Rachel', 'Joey', 'Phoebe', 'Monica', 'Chandler', 'Robert', 'Sam'];
  colorSource = ['red', 'green', 'blue', 'yellow', 'violet', 'purple', 'grey'];
  @ViewChild('name', { static: true }) name: any = ElementRef;
  @ViewChild('color', { static: true }) color: any = ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const name$ = fromEvent<any>(this.name.nativeElement, 'change').pipe(
      map(event => event.target.value),
    );
    const color$ = fromEvent<any>(this.color.nativeElement, 'change').pipe(
      pluck('target', 'value'),
    );

    // Ex -01 COMBINE-LATEST

    combineLatest([name$, color$]).subscribe(([name, color]) => {
      console.log(name, color);
      this.createBox(name, color, 'elContainer1');
    });

    // Ex - 02 withLatestFrom
    name$.pipe(withLatestFrom(color$)).subscribe(([name, color]) => {
      // console.log(name, color);
      this.createBox(name, color, 'elContainer2');
    });
  }

  createBox(name: string, color: string, containerId: string) {
    let el = document.createElement('div');
    el.innerText = name;
    el.setAttribute('class', 'item ' + color);
    if (el !== null) {
      document.getElementById(containerId)?.appendChild(el);
    }
  }


}
