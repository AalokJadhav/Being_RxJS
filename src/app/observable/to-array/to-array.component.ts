import { Component, OnInit } from '@angular/core';
import { from, interval, of, Subscription } from 'rxjs';
import { toArray, take } from 'rxjs/operators';


@Component({
  selector: 'app-to-array',
  templateUrl: './to-array.component.html',
  styleUrls: ['./to-array.component.scss']
})
export class ToArrayComponent implements OnInit {

  characters = [
    { name: 'Ross', series: 'FRIENDS', job: 'Paleontologist/Professor' },
    { name: 'Rachel', series: 'FRIENDS', job: 'Fashion Exec' },
    { name: 'Joey', series: 'FRIENDS', job: 'Actor' },
    { name: 'Phoebe ', series: 'FRIENDS', job: 'Masseuse/Musician' },
    { name: 'Monica', series: 'FRIENDS', job: 'Chef' },
    { name: 'Chandler', series: 'FRIENDS', job: 'IT Procurement' },
  ]
  constructor() { }
  sourceSubscription: Subscription = new Subscription;

  ngOnInit(): void {
    // Ex-01
    const source = interval(1000);
    this.sourceSubscription = source.pipe(
      take(5),
      toArray()
    )
      .subscribe(res => {
        // console.log(res);     
      })


    // Ex-02
    const source2 = from(this.characters);
    source2.pipe(
      toArray()
    ).subscribe(res => {
      console.log(res);

    })

    // Ex-03
    const source3 = of('Ross', 'Rachel', 'Joey', 'Phoebe', 'Monica', 'Chandler')
    source3.pipe(
      toArray()
    ).subscribe(res => {
      console.log(res);

    })
  }
}
