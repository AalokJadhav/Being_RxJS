import { Component, OnInit } from '@angular/core';
import { from, of } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';
import { DesignUtilityService } from 'src/app/services/design-utility.service';

@Component({
  selector: 'app-concat-map2',
  templateUrl: './concat-map2.component.html',
  styleUrls: ['./concat-map2.component.scss']
})
export class ConcatMap2Component implements OnInit {

  constructor(private _designUtility: DesignUtilityService) { }

  notifyData = [
    {
      name: 'Facebook',
      icon: '/assets/images/fb-icon.png',
      time: '4 second ago.',
      img: '/assets/images/navbar_logo.png',
      strong: 'Alok Jadhav',
      p: 'Awesome Post Bro..! Thanks 👍',
    },
    {
      name: 'Twitter',
      icon: '/assets/images/tw-icon.png',
      time: '3 second ago.',
      img: '/assets/images/navbar_logo.png',
      strong: 'Prashant Sorode',
      p: 'Awesome Post Bro..! Thanks 😉',
    },
    {
      name: 'Facebook',
      icon: '/assets/images/fb-icon.png',
      time: '2 second ago',
      img: '/assets/images/navbar_logo.png',
      strong: 'Alok Jadhav',
      p: 'Awesome Post Bro..! Thanks 👌',
    },
    {
      name: 'Twitter',
      icon: '/assets/images/tw-icon.png',
      time: '1 second ago',
      img: '/assets/images/navbar_logo.png',
      strong: 'Prashant Sarode',
      p: 'Awesome Post Bro..! Thanks ✌',
    }
  ];

  ngOnInit(): void {
    from(this.notifyData).pipe(
      // mergeMap(res => this.getHtml(res))
      concatMap(res => this.getHtml(res))
    ).subscribe(res => {
      console.log(res);
      this._designUtility.printdiv(res, 'elContainer');
    });
  }

  getHtml(data: any) {
    return of(`<div class="header">
      <div class="app">
        <img src="${data.icon}" width="20" class="pr-1"/>${data.name}.${data.time}
      </div>
    </div>
    <div class="body">
      <img class="rounded float-right" src="${data.img}" width="100"/>
      <strong>${data.strong}</strong>
      <p>${data.p}</p>
    </div>`).pipe(delay(2000));
  }


}
