import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProvincesComponent } from './show-provinces.component';

describe('ShowProvincesComponent', () => {
  let component: ShowProvincesComponent;
  let fixture: ComponentFixture<ShowProvincesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowProvincesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProvincesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
