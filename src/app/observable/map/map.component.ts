import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { from } from 'rxjs/internal/observable/from';
import { map } from 'rxjs/operators';
import { DesignUtilityService } from 'src/app/services/design-utility.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  sub1: any = Subscription;
  sub2: any = Subscription;
  sub3: any = Subscription;
  msg1: any;
  msg2: any;
  constructor(private _designutility: DesignUtilityService) { }

  ngOnInit(): void {

    //  Ex - 01 
    const broadCastVideos = interval(1000);
    this.sub1 = broadCastVideos.pipe(
      map(data => 'Video ' + data)
    )
      .subscribe(res => {
        this.msg1 = res;
        console.log(res);
      })
    setTimeout(() => {
      this.sub1.unsubscribe();
    }, 10000);

    // Ex - 02
    this.sub2 = broadCastVideos.pipe(
      map(data => data * 2)
    ).subscribe(res => {
      this.msg2 = res;
    });


    // Ex - 03
    const members = from([
      { id: 1, age: 20, name: 'Aron' },
      { id: 2, age: 21, name: 'Jaison' },
      { id: 3, age: 22, name: 'Solomon' },
      { id: 4, age: 23, name: 'Canon' },
      { id: 5, age: 24, name: 'Mixin' },
      { id: 6, age: 25, name: 'John' },
      { id: 7, age: 26, name: 'Alex' },
      { id: 8, age: 27, name: 'Jake' },
      { id: 9, age: 28, name: 'Mani' },
      { id: 10, age: 29, name: 'Muthu' },
    ]);

    this.sub3 = members.pipe(
      map(data => `Name: ${data.name}, Age: ${data.age}`)
    ).subscribe(res => {
      console.log(res);

      this._designutility.print(res, 'elContainer');
    });


    setTimeout(() => {
      this.sub1.unsubscribe();
      this.sub2.unsubscribe();
      this.sub3.unsubscribe();
    }, 10000);
  }

}
