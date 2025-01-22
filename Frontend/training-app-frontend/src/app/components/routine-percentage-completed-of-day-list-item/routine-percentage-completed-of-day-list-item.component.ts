import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import RoutineProgress from 'src/app/interfaces/RoutineProgressDTO';

@Component({
  selector: 'app-routine-percentage-completed-of-day-list-item',
  templateUrl: './routine-percentage-completed-of-day-list-item.component.html',
  styleUrls: ['./routine-percentage-completed-of-day-list-item.component.scss'],
  standalone: true,
  imports: [ IonicModule ],
})
export class RoutinePercentageCompletedOfDayListItemComponent {

  @Input() routine!: RoutineProgress;

  constructor() { }

}
