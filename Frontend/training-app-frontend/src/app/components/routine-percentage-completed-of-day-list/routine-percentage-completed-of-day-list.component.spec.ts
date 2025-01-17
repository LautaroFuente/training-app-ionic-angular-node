import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RoutinePercentageCompletedOfDayListComponent } from './routine-percentage-completed-of-day-list.component';

describe('RoutinePercentageCompletedOfDayListComponent', () => {
  let component: RoutinePercentageCompletedOfDayListComponent;
  let fixture: ComponentFixture<RoutinePercentageCompletedOfDayListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutinePercentageCompletedOfDayListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RoutinePercentageCompletedOfDayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
