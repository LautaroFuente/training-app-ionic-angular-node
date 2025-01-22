import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { RoutinePercentageCompletedOfDayListComponent } from 'src/app/components/routine-percentage-completed-of-day-list/routine-percentage-completed-of-day-list.component';
import { UserProgressService } from 'src/app/services/user-progress.service';
import { GlobalUserService } from 'src/app/services/global-user.service';
import RoutineProgress from 'src/app/interfaces/RoutineProgressDTO';

const weekDays = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  standalone: true,
  imports: [ IonicModule, RoutinePercentageCompletedOfDayListComponent ],
})
export class ProgressComponent  implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();
  routinesProgress!: RoutineProgress[];

  constructor(private userProgressService: UserProgressService, private router: Router, private globalUserService: GlobalUserService) { }

  ngOnInit() {
    // Obtener rutinas del dia junto con sus porcentajes de completado del usuario
    this.getRoutinesOfDay();
  }

  // Metodo para obtener por medio de un servicio las rutinas del dia con su porcentaje de completado
  private getRoutinesOfDay(){

    // Obtener el dia actual y el id de usuario
    const todayDate = new Date();
    const nameDay = weekDays[todayDate.getDay()];

    const userId = this.globalUserService.getId();

    // Llamar al servicio para obtener la informacion
    this.userProgressService.getRoutinesPercentageOfDay(userId, nameDay).pipe(takeUntil(this.unsubscribe$)).subscribe(
      (response) =>{
        console.log('rutinas del dia con sus porcentajes de completado obtenidas correctamente');
        this.routinesProgress = response;
      },
      (error) =>{
        console.log('Error al obtener las rutinas del dia con sus porcentajes de completado', error);
      }
    );
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
