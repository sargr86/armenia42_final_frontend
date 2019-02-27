import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveDirectionComponent } from './save-direction.component';

describe('SaveDirectionComponent', () => {
  let component: SaveDirectionComponent;
  let fixture: ComponentFixture<SaveDirectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveDirectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveDirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
