import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promise',
  templateUrl: './promise.component.html',
  styleUrls: ['./promise.component.scss']
})
export class PromiseComponent implements OnInit {
  promiseVal: any = [];

  dell = [{
    brand: 'Dell',
    hardDisk: '2 TB',
    color: 'Black',
    price: 25000
  }]

  hp = [{
    brand: 'HP',
    hardDisk: '1 TB',
    color: 'Silver',
    price: 25000

  }]

  notAvaliable = [{
    brand: 'No Brand',
    status: 'Failed',
    price: 0

  }]

  Data1 = '';
  result1: any;
  result2: any;
  result3: any;

  public buyLaptop3: 'https://jsonplaceholder.typicode.com/posts' | undefined;
  constructor(private http: HttpClient) { }

  DellAvaliable() {

    return false
  }
  HpAvaliable() {
    return true
  }
  NotAvaliable() {

  }
  ngOnInit(): void {
    let buyLaptop = new Promise((resolve, reject) => {
      // resolve('Promise is Resolved..!');
      // reject('Promise is Rejected..!');
      if (this.DellAvaliable()) {
        setTimeout(() => {
          // resolve('Dell is Purchased..!');
          resolve(this.dell);

        }, 3000);
      } else if (this.HpAvaliable()) {
        setTimeout(() => {
          // resolve('Hp is Purchased..!');
          resolve(this.hp);

        }, 3000);
      } else {
        setTimeout(() => {
          // reject('Laptop is not avaliable on Store.');
          reject(this.notAvaliable)

        }, 3000);
      }

    });
    buyLaptop.then(res => {
      console.log('then code =>', res);
      this.promiseVal = res;

    }).catch(res => {
      console.log('catch code =>', res);
      this.promiseVal = res;
    });


  }



  // Ex- 1 :  With Promises
  fetch1() {
    let buyLaptop1 = new Promise((resolve, reject) => {
      resolve(this.dell);
    });
    buyLaptop1.then((res) => {
      this.result1 = res;
    })
    this.Data1 = 'Fetching Data';
  }


  // Ex- 2 :  With Async / await
  async fetch2() {
    let buyLaptop2 = new Promise((resolve, reject) => {
      resolve(this.dell);
    });
    buyLaptop2.then((res) => {
      this.result2 = res;
    })
    let data = await buyLaptop2;
    console.log(data);

  }


  // Ex- 3 :  With Fetch API
  async fetch3() {
    this.Data1 = 'Fetching Data';
    this.http.get('https://jsonplaceholder.typicode.com/posts')
      .subscribe(async response => {
        this.result3 = await JSON.stringify(response);
        console.log(this.result3);
      });
  }
}