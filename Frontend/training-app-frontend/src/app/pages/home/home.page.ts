import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonContent, RouterModule, IonicModule],
})
export class HomePage {
  constructor(private router: Router) {}

  goToRegister(): void{
    this.router.navigate(['/register']);
  }

  goToLogin(): void{
    this.router.navigate(['/login']);
  }
}
