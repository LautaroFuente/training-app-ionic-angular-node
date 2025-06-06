import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { RegisterService } from 'src/app/services/register.service';
import { FormRegisterComponent } from 'src/app/components/form-register/form-register.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    IonicModule,
    FormRegisterComponent,
  ],
})
export class RegisterComponent implements OnInit, OnDestroy {
  formRegister!: FormGroup;
  name!: string;
  email!: string;
  gender!: string;
  password!: string;

  private unsubscribe$ = new Subject<void>();

  private router = inject(Router);
  private fb = inject(FormBuilder);
  private registerService = inject(RegisterService);

  ngOnInit() {
    this.formRegister = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // Metodo para el submit del formulario
  onSubmit(data: {
    name: string;
    email: string;
    gender: string;
    password: string;
  }): void {
    this.registerService
      .register(data.name, data.email, data.gender, data.password)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (response) => {
          console.log('Usuario registrado correctamente');
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log('Error al registrar el usuario', error);
        }
      );
  }

  // Desuscribir al destruir el componentes
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
