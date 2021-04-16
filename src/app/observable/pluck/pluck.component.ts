import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs/internal/observable/from';
import { pluck } from 'rxjs/internal/operators/pluck';
import { toArray } from 'rxjs/operators';

@Component({
  selector: 'app-pluck',
  templateUrl: './pluck.component.html',
  styleUrls: ['./pluck.component.scss']
})
export class PluckComponent implements OnInit {

  data1: any;
  data2: any;
  constructor() { }

  users = [
    { id: 1, age: 20, name: 'Aron', gender: 'male', skills: 'Angular', job: { title: 'Frontend Developer', exp: '10 Years' } },
    { id: 2, age: 21, name: 'Jaison', gender: 'male', skills: 'Javascript', job: { title: 'UX Developer', exp: '8 Years' } },
    { id: 3, age: 22, name: 'Solomon', gender: 'male', skills: 'NodeJS', job: { title: 'Backend Developer', exp: '6 Years' } },
    { id: 4, age: 23, name: 'Priya', gender: 'female', skills: 'NestJS', job: { title: 'Backend Developer', exp: '5 Years' } },
    { id: 5, age: 24, name: 'Sanjana', gender: 'female', skills: 'Html', job: { title: 'Web Developer', exp: '3 Years' } },
    { id: 6, age: 25, name: 'John', gender: 'male', skills: 'CSS', job: { title: 'UI Developer', exp: '2 Years' } },
    { id: 7, age: 26, name: 'Alex', gender: 'male', skills: 'Android', job: { title: 'Mobile App Developer', exp: '1 Years' } },
    { id: 8, age: 27, name: 'Rathna', gender: 'female', skills: 'Kotlin', job: { title: 'Mobile App Developer', exp: '2 Years' } },
    { id: 9, age: 28, name: 'Mani', gender: 'male', skills: 'Flutter', job: { title: 'Mobile App Developer', exp: '6 Years' } },
    { id: 10, age: 29, name: 'Dhivya', gender: 'female', skills: 'Typescript', job: { title: 'Frontend Developer', exp: '7 Years' } },
  ];

  ngOnInit(): void {

    // Ex - 01
    from(this.users).pipe(
      // map(data => data.name),
      pluck('name'),
      toArray()
    ).subscribe(res => {
      // console.log(res)
      this.data1 = res;
    });

    // Ex - 02
    from(this.users).pipe(
      pluck('job', 'title'),
      toArray()
    ).subscribe(res => {
      // console.log(res)
      this.data2 = res;
    });
  }

}
