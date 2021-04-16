import { Component, OnInit } from '@angular/core';
import { observable, Observable, Subscription } from 'rxjs';
import { DesignUtilityService } from 'src/app/services/design-utility.service';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class CustomComponent implements OnInit {
  textStatus: any;
  textStatus2: any;
  names: any;
  namestatus: any;
  subscription2: Subscription = new Subscription;
  randomNamesSubscription!: Subscription;
  constructor(private _designutility: DesignUtilityService) { }

  ngOnInit(): void {

    // Ex - 01 (Manual)
    const customObj1 = Observable.create((observer: any) => {
      setTimeout(() => {
        observer.next('Angular');
      }, 1000);
      setTimeout(() => {
        observer.next('Typescript');
      }, 2000);
      setTimeout(() => {
        observer.next('Html & CSS');
        // observer.error(new Error('Limit Exceed..!'));
      }, 3000);
      setTimeout(() => {
        observer.next('JavaScript');
        observer.complete();

      }, 4000);
      setTimeout(() => {
        observer.next('Jquery');
      }, 5000);
    });
    customObj1.subscribe((res: any) => {
      // console.log(res);
      this._designutility.print(res, 'elContainer1');

    },
      (err: any) => {
        this.textStatus = 'error';

      },
      () => {
        this.textStatus = 'Completed..!'

      });

    // Ex - 02 (Custom Interval Observable)
    const Arr2 = ['Angular', 'Typescript', 'Html & CSS', 'Javascript', 'Jquery', 'RxJs']
    const customObj2 = Observable.create((observer: any) => {
      let count = 0;
      setInterval(() => {
        observer.next(Arr2[count]);
        if (count >= 3) {
          observer.error('Error Emit..!');
        }
        if (count >= 5) {
          observer.complete();
        }
        count++;
      }, 1000)
    });
    this.subscription2 = customObj2.subscribe((res: any) => {
      // console.log(res);
      this._designutility.print(res, 'elContainer2');

    },
      (err: any) => {
        this.textStatus2 = 'error';

      },
      () => {
        this.textStatus2 = 'Completed..!'

      });


    // Ex - 03 (Random Names)
    const Arr3 = ['Ross', 'Rachel', 'Joey', 'Phoebe', 'Monica', 'Chandler']
    const customObj3 = Observable.create((observer: any) => {
      let count = 0;
      setInterval(() => {
        observer.next(Arr3[count]);
        if (count >= 3) {
          // observer.error('Error Emit..!');
        }
        if (count >= 5) {
          observer.complete();
        }
        count++;
      }, 1000)
    });

    this.randomNamesSubscription = customObj3.subscribe((res: any) => {
      console.log(res);
      this.names = res;

    },
      (err: any) => {
        this.namestatus = 'error';

      },
      () => {
        this.namestatus = 'Completed..!'

      })
  }

  ngOnDestroy(): void {
    this.subscription2.unsubscribe();
  }

}
