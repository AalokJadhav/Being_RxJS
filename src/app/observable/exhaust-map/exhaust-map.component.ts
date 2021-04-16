import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { exhaustMap, tap } from 'rxjs/operators';
import { DesignUtilityService } from 'src/app/services/design-utility.service';

@Component({
  selector: 'app-exhaust-map',
  templateUrl: './exhaust-map.component.html',
  styleUrls: ['./exhaust-map.component.scss']
})
export class ExhaustMapComponent implements OnInit {

  constructor(private http: HttpClient, private _designUtility: DesignUtilityService) { }

  fetching = false;
  url = 'https://global-1bb0f.firebaseio.com/exhaustMap.json';
  num = 0;
  saveRequest: any;
  @ViewChild('btn', { static: true })
  btn!: ElementRef;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    fromEvent(this.btn.nativeElement, 'click').pipe(
      tap(() => this.fetching = true),
      // concatMap(() => this.onSave(this.num++))
      exhaustMap(() => this.onSave(++this.num))
    ).subscribe(res => {
      // console.log(res);
      this.onFetch();
      this.fetching = false;
    });
  }

  onSave(changes: any) {
    return this.http.put(this.url, { data: changes });
  }

  onFetch() {
    this.http.get<any>(this.url).subscribe((res: any) => {
      // console.log(res.data);
      this.saveRequest = res.data;
    });
  }

  // btnClick() {
  //   this.onSave(this.num++).subscribe(res => {
  //     console.log(res);
  //   });
  // }

}
