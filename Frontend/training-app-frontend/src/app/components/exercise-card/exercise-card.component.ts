import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Exercise } from 'src/app/interfaces/Exercise';

@Component({
  selector: 'app-exercise-card',
  templateUrl: './exercise-card.component.html',
  styleUrls: ['./exercise-card.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class ExerciseCardComponent {

  @Input() exercise!: Exercise;
  @Output() cardClick = new EventEmitter<Exercise>();

  constructor() { }

  onCardClick(){
    this.cardClick.emit(this.exercise);
  }
}
