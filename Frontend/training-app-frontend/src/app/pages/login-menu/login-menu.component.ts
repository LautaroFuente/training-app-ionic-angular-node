import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { GlobalUserService } from 'src/app/services/global-user.service';

@Component({
  selector: 'app-login-menu',
  templateUrl: './login-menu.component.html',
  styleUrls: ['./login-menu.component.scss'],
  standalone: true,
  imports: [IonContent, RouterModule, IonicModule],
})
export class LoginMenuComponent {

  constructor(private router: Router, private userGlobal: GlobalUserService) { }

  goToCreateRoutine(): void{
    this.router.navigate(['/create-routine']);
  }

  goToMyRoutines(): void{
    this.router.navigate(['/my-routines']);
  }

  goToExercises(): void{
    this.router.navigate(['/list-exercises']);
  }

  goToMyProgress(): void{
    this.router.navigate(['/progress']);
  }

  goToCalendary(): void{
    this.router.navigate(['/scheduler-routines']);
  }

  closeSession(): void{
    this.userGlobal.logout();
    this.router.navigate(['/home']);
  }

}
