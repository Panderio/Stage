import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsInstruComponent } from './details-instru.component';

describe('DetailsInstruComponent', () => {
  let component: DetailsInstruComponent;
  let fixture: ComponentFixture<DetailsInstruComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsInstruComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsInstruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
