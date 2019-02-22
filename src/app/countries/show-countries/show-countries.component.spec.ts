import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCountriesComponent } from './show-countries.component';

describe('ShowCountriesComponent', () => {
  let component: ShowCountriesComponent;
  let fixture: ComponentFixture<ShowCountriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCountriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
