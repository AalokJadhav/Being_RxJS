import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcatMap2Component } from './concat-map2.component';

describe('ConcatMap2Component', () => {
  let component: ConcatMap2Component;
  let fixture: ComponentFixture<ConcatMap2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConcatMap2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcatMap2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
