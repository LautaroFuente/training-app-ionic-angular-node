import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RoutinePercentageCompletedOfDayListComponent } from 'src/app/components/routine-percentage-completed-of-day-list/routine-percentage-completed-of-day-list.component';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  standalone: true,
  imports: [ IonicModule, RoutinePercentageCompletedOfDayListComponent ],
})
export class ProgressComponent  implements OnInit {

  constructor() { }

  ngOnInit() {
    // Obtener rutinas del dia junto con sus porcentajes de completado del usuario
    this.getRoutinesOfDay();
  }

  private getRoutinesOfDay(){
    
  }

}
