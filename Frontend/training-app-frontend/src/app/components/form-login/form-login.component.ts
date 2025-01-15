import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss'],
  standalone: true,
  imports: [ IonicModule, ReactiveFormsModule, FormsModule ],
})
export class FormLoginComponent {

  @Input() form!: FormGroup;
  @Output() clickSubmit = new EventEmitter<{email: string, password: string}>();
  
  constructor() { }
  
  onSubmit() {
    if(this.form.valid){
      const {email, password} = this.form.value;
      this.clickSubmit.emit({ email, password });
    }else {
      console.log('Formulario de inicio de sesion no válido'); 
    }
    }

}
