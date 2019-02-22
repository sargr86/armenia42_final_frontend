import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveCountryComponent } from './save-country.component';

describe('SaveCountryComponent', () => {
  let component: SaveCountryComponent;
  let fixture: ComponentFixture<SaveCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
