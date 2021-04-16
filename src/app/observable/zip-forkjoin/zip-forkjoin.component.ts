import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { forkJoin, fromEvent, zip } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-zip-forkjoin',
  templateUrl: './zip-forkjoin.component.html',
  styleUrls: ['./zip-forkjoin.component.scss']
})
export class ZipForkjoinComponent implements OnInit {

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
      take(4)
    );
    const color$ = fromEvent<any>(this.color.nativeElement, 'change').pipe(
      map(event => event.target.value),
      take(3)
    );

    // Ex -01 ZIP

    zip(name$, color$).subscribe(([name, color]) => {
      // console.log(name, color);
      this.createBox(name, color, 'elContainer1');
    });

    // Ex - 02 ForkJoin

    forkJoin([name$, color$]).subscribe(([name, color]) => {
      // console.log(name, color);
      this.createBox(name, color, 'elContainer2');
    });
  }

  createBox(name: string, color: string, containerId: string) {
    let el = document.createElement('div');
    el.innerText = name;
    el.setAttribute('class', 'item ' + color);
    if (el != null) {
      document.getElementById(containerId)?.appendChild(el);
    }
  }

}
