import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveProvinceComponent } from './save-province.component';

describe('SaveProvinceComponent', () => {
  let component: SaveProvinceComponent;
  let fixture: ComponentFixture<SaveProvinceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveProvinceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveProvinceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
