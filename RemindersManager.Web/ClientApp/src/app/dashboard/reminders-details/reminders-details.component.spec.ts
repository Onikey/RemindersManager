import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindersDetailsComponent } from './reminders-details.component';

describe('RemindersDetailsComponent', () => {
  let component: RemindersDetailsComponent;
  let fixture: ComponentFixture<RemindersDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemindersDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemindersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
