import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGradingResultsComponent } from './view-grading-results.component';

describe('ViewGradingResultsComponent', () => {
  let component: ViewGradingResultsComponent;
  let fixture: ComponentFixture<ViewGradingResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewGradingResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGradingResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
