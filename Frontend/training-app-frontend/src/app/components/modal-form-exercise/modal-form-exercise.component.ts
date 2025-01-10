import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import {IonModal} from '@ionic/angular/standalone';
import { OverlayEventDetail } from '@ionic/core/components';
import { ViewChild } from '@angular/core';
import { FormExerciseComponent } from '../form-exercise/form-exercise.component';

@Component({
  selector: 'app-modal-form-exercise',
  templateUrl: './modal-form-exercise.component.html',
  styleUrls: ['./modal-form-exercise.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, FormsModule, FormExerciseComponent]
})
export class ModalFormExerciseComponent  implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;
  isModalOpen: boolean = false;
  @Output() formSubmitted = new EventEmitter<{ sets: number, repetitions: number, weight: number }>();

  formToExercise!: FormGroup;
  sets!: number;
  repetitions!: number;
  weight!: number;

  constructor() { }

  fb = inject(FormBuilder);

  ngOnInit() {
    // Crear formulario del modal
    this.formToExercise = this.fb.group({
      sets: [1, [Validators.required, Validators.min(1)]],
      repetitions: [1, [Validators.required, Validators.min(1)]],
      weight: [1, [Validators.required, Validators.min(1)]],
    });
  }

  // Logica del modal
  cancel() {
    this.isModalOpen = false;
    this.modal.dismiss(null, 'cancel');
  }

  confirm(data: {sets: number, repetitions: number, weight: number}) {
    let { sets, repetitions, weight } = data;
    this.formSubmitted.emit({ sets, repetitions, weight });
    this.modal.dismiss({sets, repetitions, weight}, 'confirm');
    this.isModalOpen = false;
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      const { sets, repetitions, weight } = event.detail.data;
      console.log(sets, repetitions, weight);
    }
  }

}
