import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultilineseriesComponent } from './multilineseries.component';

describe('MultilineseriesComponent', () => {
  let component: MultilineseriesComponent;
  let fixture: ComponentFixture<MultilineseriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultilineseriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultilineseriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
