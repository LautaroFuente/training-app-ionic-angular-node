import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Routine } from 'src/app/interfaces/Routine';
import { RoutineCardComponent } from '../routine-card/routine-card.component';

@Component({
  selector: 'app-routines-list',
  templateUrl: './routines-list.component.html',
  styleUrls: ['./routines-list.component.scss'],
  standalone: true,
  imports: [IonicModule, RoutineCardComponent],
})
export class RoutinesListComponent {

  @Input() routines!: Routine[]

  constructor() { }

}
