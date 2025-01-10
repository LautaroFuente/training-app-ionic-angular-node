import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-exercise',
  templateUrl: './form-exercise.component.html',
  styleUrls: ['./form-exercise.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, ReactiveFormsModule],
})
export class FormExerciseComponent {

  @Input() form!: FormGroup;
  @Output() clickSubmit = new EventEmitter<{sets: number, repetitions: number, weight: number}>();

  constructor() { }

  onSubmit() {
    if(this.form.valid){
      const {sets, repetitions, weight} = this.form.value;
      this.clickSubmit.emit({ sets, repetitions, weight });
    }else {
      console.log('Formulario de ejercicio no válido'); 
    }
  }

}
