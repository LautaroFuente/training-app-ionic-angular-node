import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonContent} from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalUserService } from 'src/app/services/global-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterModule, IonicModule],
})
export class LoginComponent  implements OnInit, OnDestroy {

  formLogin!: FormGroup;
  email!: string;
  password!: string;

  private unsubscribe$ = new Subject<void>();

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private userGlobal: GlobalUserService) { }

  ngOnInit() {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if(this.formLogin.valid){
      const {email, password} = this.formLogin.value;
      this.authService.auth(email, password).pipe(takeUntil(this.unsubscribe$)).subscribe(
        (response) =>{
          console.log('Usuario logueado correctamente');
          const { token, name, email, id } = response.data;
          this.userGlobal.login(name, email, token, id);
          this.router.navigate(['/login-menu']);
        },
        (error) =>{
          console.log('Error al loguear el usuario', error);
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
