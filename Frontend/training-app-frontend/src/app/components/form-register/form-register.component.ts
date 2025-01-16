import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss'],
  standalone: true,
  imports: [ IonicModule, ReactiveFormsModule, FormsModule ],
})
export class FormRegisterComponent {

  @Input() form!: FormGroup;
  @Output() clickSubmit = new EventEmitter<{name: string, email: string, gender: string, password: string}>();
  
  constructor() { }
  
  onSubmit() {
    if(this.form.valid){
      const { name, email, gender, password } = this.form.value;
      this.clickSubmit.emit({ name, email, gender, password });
    }else {
      console.log('Formulario de registro no válido'); 
    }
    }

}
