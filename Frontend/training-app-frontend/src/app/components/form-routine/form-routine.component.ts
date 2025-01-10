import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-routine',
  templateUrl: './form-routine.component.html',
  styleUrls: ['./form-routine.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, ReactiveFormsModule],
})
export class FormRoutineComponent  implements OnInit {

  constructor() { }

  fb = inject(FormBuilder);

  formRoutine!: FormGroup;
  name!: string;
  description: string = '';

  @Output() submitRoutineForm = new EventEmitter<{name: string, description: string}>();

  ngOnInit() {
    // Crear formulario rutina
    this.formRoutine = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  onSubmit() {
    if(this.formRoutine.valid){
      const { name, description } = this.formRoutine.value;
      this.submitRoutineForm.emit({name, description});
    }else {
      console.log('Formulario de ejercicio no válido'); 
    }
  }

}
