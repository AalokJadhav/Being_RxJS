import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, delay, map, retryWhen, scan } from 'rxjs/operators';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-retry',
  templateUrl: './retry.component.html',
  styleUrls: ['./retry.component.scss']
})
export class RetryComponent implements OnInit {
  url = ''
  person: any;
  fetching: boolean = false;
  status = 'No Data';
  error: any;
  constructor(private http: HttpClient, private _errService: ErrorService) { }

  ngOnInit(): void {
    this.fetchDetails();
  }


  fetchDetails() {
    this.person = null;
    this.fetching = true;
    this.status = 'Fetching data...';

    // for Error
    // this.http.get(this.url)

    // for Success
    this.http.get('https://randomuser.me/api/')
      .pipe(
        // retry(4),
        retryWhen(err => err.pipe(
          delay(2000),
          scan((retryCount) => {
            if (retryCount >= 3) {
              throw err;
            }
            retryCount = retryCount + 1;
            console.log('retry count => ', retryCount);
            this.status = 'Retrying Attempt #' + retryCount;
            return retryCount;
          }, 0)
        )),
        catchError(this._errService.handleError),
        map((res: any) => res.results[0]),
      ).subscribe(
        (res: any) => {
          // console.log(res);
          this.person = {
            id: res.id.value || '<not specified>',
            name: res.name.title + '.' + res.name.first + ' ' + res.name.last,
            email: res.email,
            gender: res.gender,
            age: res.registered.age,
            phone: res.phone,
            picture: res.picture.large,
            location: res.location.country
          };
          this.status = 'Data Fetched.';
          this.fetching = false;
        },
        (err) => {
          // console.log(err);
          this.error = err;
          this.status = 'Problem in fetching data.';
          this.fetching = false;
        });
  }

  closeErrorAlert() {
    this.error = null;
  }



}
