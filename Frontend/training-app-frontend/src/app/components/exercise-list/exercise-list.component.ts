import { Component, Input } from '@angular/core';
import { Exercise } from 'src/app/interfaces/Exercise';
import { IonicModule } from '@ionic/angular';
import { ExerciseCardComponent } from '../exercise-card/exercise-card.component';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss'],
  standalone: true,
  imports: [IonicModule, ExerciseCardComponent],
})
export class ExerciseListComponent  {

  @Input() exercises!: Exercise[];

  constructor() { }

}
