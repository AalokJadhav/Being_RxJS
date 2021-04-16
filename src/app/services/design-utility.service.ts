import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class DesignUtilityService {

  exclusive = new Subject<boolean>();
  videoEmit = new ReplaySubject<string>(3, 2000);
  asyncVideoEmit = new AsyncSubject();

  private userNameSubject = new BehaviorSubject<string>('Alok');
  userName$ = this.userNameSubject.asObservable();

  constructor(private http: HttpClient, private _errService: ErrorService) { }

  print(val: any, containerId: string) {
    let el = document.createElement('li');
    el.innerText = val;
    document.getElementById(containerId)?.appendChild(el)
  }

  setUserName(val: string) {
    this.userNameSubject.next(val);
  }

  printdiv(val: any, containerId: string) {
    let el = document.createElement('div');
    el.setAttribute('class', 'item');
    el.innerHTML = val;
    if (el !== null) {
      document.getElementById(containerId)?.prepend(el);
    }
  }
  url = 'https://test-products-b05fe.firebaseio.com/products.json';
  // url = "https://my-json-server.typicode.com/leefordjudes/rxjsSeries/app-jsondb/videoList";

  getProducts(): Observable<any> {
    return this.http.get<any>(this.url).pipe(catchError(this._errService.handleError));
  }
}
