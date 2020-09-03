import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatgComponent } from './catg.component';

describe('CatgComponent', () => {
  let component: CatgComponent;
  let fixture: ComponentFixture<CatgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
