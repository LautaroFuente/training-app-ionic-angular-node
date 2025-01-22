import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-scheduler-routines',
  templateUrl: './scheduler-routines.component.html',
  styleUrls: ['./scheduler-routines.component.scss'],
  standalone: true,
  imports: [ IonicModule ],
})
export class SchedulerRoutinesComponent  implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();

  constructor( private router: Router) { }

  ngOnInit() {
    // Llamar a metodo para obtener las rutinas que el usuario creo
    this.obtainRoutineFromUser();
  }

  // Metodo para obtener las rutinas que ese usuario creo
  obtainRoutineFromUser(): void {
    
  }

  // Desuscribir al destruir el componente
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // Metodo para volver atras
  goBack() {
    this.router.navigate(['/login-menu']);
  }
}
