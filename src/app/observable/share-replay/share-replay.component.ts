import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-share-replay',
  templateUrl: './share-replay.component.html',
  styleUrls: ['./share-replay.component.scss']
})
export class ShareReplayComponent implements OnInit {

  // url = 'https://test-products-b05fe.firebaseio.com/products.json';
  url = "https://my-json-server.typicode.com/leefordjudes/rxjsSeries/products";
  allProducts: Observable<any> | undefined;
  mobiles: Observable<any> | undefined;
  laptops: Observable<any> | undefined;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.allProducts = this.http.get(this.url).pipe(shareReplay());
    this.mobiles = this.allProducts.pipe(
      map(res => res.filter((data: { [x: string]: string; }) => data['type'] === 'mobile'))
    );
    this.laptops = this.allProducts.pipe(
      map(res => res.filter((data: { [x: string]: string; }) => data['type'] === 'laptop'))
    );
  }


}
