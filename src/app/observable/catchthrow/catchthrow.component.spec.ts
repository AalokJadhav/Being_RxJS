import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatchthrowComponent } from './catchthrow.component';

describe('CatchthrowComponent', () => {
  let component: CatchthrowComponent;
  let fixture: ComponentFixture<CatchthrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatchthrowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatchthrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
