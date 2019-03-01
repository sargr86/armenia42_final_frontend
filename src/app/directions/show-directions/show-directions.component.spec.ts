import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDirectionsComponent } from './show-directions.component';

describe('ShowDirectionsComponent', () => {
  let component: ShowDirectionsComponent;
  let fixture: ComponentFixture<ShowDirectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDirectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDirectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
