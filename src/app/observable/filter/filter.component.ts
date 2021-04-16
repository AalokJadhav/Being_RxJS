import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { filter, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  users = [
    { id: 1, age: 20, name: 'Aron', gender: 'male', skills: 'Angular', job: { title: 'Frontend Developer', exp: '10 Years' } },
    { id: 2, age: 21, name: 'Jaison', gender: 'male', skills: 'Javascript', job: { title: 'UX Developer', exp: '8 Years' } },
    { id: 3, age: 22, name: 'Solomon', gender: 'male', skills: 'NodeJS', job: { title: 'Backend Developer', exp: '6 Years' } },
    { id: 4, age: 23, name: 'Priya', gender: 'female', skills: 'NestJS', job: { title: 'Backend Developer', exp: '5 Years' } },
    { id: 5, age: 24, name: 'Sanjana', gender: 'female', skills: 'Html', job: { title: 'Web Developer', exp: '3 Years' } },
    { id: 6, age: 25, name: 'John', gender: 'male', skills: 'CSS', job: { title: 'UI Developer', exp: '2 Years' } },
    { id: 7, age: 26, name: 'Alex', gender: 'male', skills: 'Android', job: { title: 'Mobile App Developer', exp: '1 Years' } },
    { id: 8, age: 27, name: 'Rathna', gender: 'female', skills: 'Kotlin', job: { title: 'Mobile App Developer', exp: '2 Years' } },
    { id: 9, age: 28, name: 'Alok', gender: 'male', skills: 'Flutter', job: { title: 'Mobile App Developer', exp: '6 Years' } },
    { id: 10, age: 29, name: 'Dhivya', gender: 'female', skills: 'Typescript', job: { title: 'Frontend Developer', exp: '7 Years' } },
  ];
  data1: any;
  data2: any;
  data3: any;
  ngOnInit(): void {
    const source = from(this.users);

    // Ex - 01 - Filter by name length
    source.pipe(
      filter(user => user.name.length > 6),
      toArray()
    ).subscribe(res => {
      this.data1 = res;
    });

    // Ex - 02 - filter by gender
    source.pipe(
      filter(user => user.gender === 'male'),
      toArray()
    ).subscribe(res => {
      this.data2 = res;
    });

    // Ex - 03 - filter by nth Item
    source.pipe(
      filter(user => user.id <= 6),
      toArray()
    ).subscribe(res => {
      this.data3 = res;
    });
  }

}
