import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RoutinePercentageCompletedOfDayListItemComponent } from './routine-percentage-completed-of-day-list-item.component';

describe('RoutinePercentageCompletedOfDayListItemComponent', () => {
  let component: RoutinePercentageCompletedOfDayListItemComponent;
  let fixture: ComponentFixture<RoutinePercentageCompletedOfDayListItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutinePercentageCompletedOfDayListItemComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RoutinePercentageCompletedOfDayListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
