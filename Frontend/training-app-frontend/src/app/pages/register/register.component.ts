import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonContent} from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterModule, IonicModule]
})
export class RegisterComponent  implements OnInit, OnDestroy {

  formRegister!: FormGroup;
  name!: string;
  email!: string;
  gender!: string;
  password!: string;

  private unsubscribe$ = new Subject<void>();

  constructor(private router: Router, private fb: FormBuilder, private registerService: RegisterService) { }

  ngOnInit() {
    this.formRegister = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmit(): void {
    if(this.formRegister.valid){
      const {name, email, gender, password} = this.formRegister.value;
      this.registerService.register(name, email, gender, password).pipe(takeUntil(this.unsubscribe$)).subscribe(
        (response) =>{
          console.log('Usuario registrado correctamente');
          this.router.navigate(['/login']);
        },
        (error) =>{
          console.log('Error al registrar el usuario', error);
        });
    }else {
      console.log('Formulario no válido'); 
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
