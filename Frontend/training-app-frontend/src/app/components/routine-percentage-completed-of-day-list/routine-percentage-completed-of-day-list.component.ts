import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import RoutineProgress from 'src/app/interfaces/RoutineProgressDTO';
import { RoutinePercentageCompletedOfDayListItemComponent } from "../routine-percentage-completed-of-day-list-item/routine-percentage-completed-of-day-list-item.component";

@Component({
  selector: 'app-routine-percentage-completed-of-day-list',
  templateUrl: './routine-percentage-completed-of-day-list.component.html',
  styleUrls: ['./routine-percentage-completed-of-day-list.component.scss'],
  standalone: true,
  imports: [IonicModule, RoutinePercentageCompletedOfDayListItemComponent],
})
export class RoutinePercentageCompletedOfDayListComponent {

  @Input() routines!: RoutineProgress[];

  constructor() { }


}
