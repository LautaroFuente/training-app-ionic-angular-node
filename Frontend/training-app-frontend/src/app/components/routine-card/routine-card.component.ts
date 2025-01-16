import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Routine } from 'src/app/interfaces/Routine';

@Component({
  selector: 'app-routine-card',
  templateUrl: './routine-card.component.html',
  styleUrls: ['./routine-card.component.scss'],
  standalone: true,
  imports: [IonicModule],  
})
export class RoutineCardComponent {

  @Input() routine!: Routine;
  @Output() cardClick = new EventEmitter<Routine>();

  constructor() { }

  onCardClick(){
    this.cardClick.emit(this.routine);
  }

}
