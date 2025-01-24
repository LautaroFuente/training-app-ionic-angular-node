import { TestBed } from '@angular/core/testing';

import { WeeklyCalendarService } from './weekly-calendar.service';

describe('WeeklyCalendarService', () => {
  let service: WeeklyCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeeklyCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
