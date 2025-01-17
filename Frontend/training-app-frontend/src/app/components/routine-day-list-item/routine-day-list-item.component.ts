import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

interface RoutineOfDayCompletedPercentage {
  name: string;
  completionPercentage: number;
}

@Component({
  selector: 'app-routine-day-list-item',
  templateUrl: './routine-day-list-item.component.html',
  styleUrls: ['./routine-day-list-item.component.scss'],
  standalone: true,
  imports: [ IonicModule ],
})
export class RoutineDayListItemComponent {

  @Input() routine!: RoutineOfDayCompletedPercentage;

  constructor() { }

}
