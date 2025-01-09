import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RepsExerciseDTO } from 'src/app/interfaces/reps-exercise-dto';

@Component({
  selector: 'app-selected-exercise-card',
  templateUrl: './selected-exercise-card.component.html',
  styleUrls: ['./selected-exercise-card.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class SelectedExerciseCardComponent {

  @Input() repsExercise!: RepsExerciseDTO;
  @Output() cardClick = new EventEmitter<RepsExerciseDTO>();

  constructor() { }

  onCardClick(){
    this.cardClick.emit(this.repsExercise);
  }
}
