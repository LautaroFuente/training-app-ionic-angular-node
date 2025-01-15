import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { Routine } from 'src/app/interfaces/Routine';
import { RoutineService } from 'src/app/services/routine.service';

@Component({
  selector: 'app-my-routines',
  templateUrl: './my-routines.component.html',
  styleUrls: ['./my-routines.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class MyRoutinesComponent  implements OnInit {

  routines!: Routine[];
  
    private unsubscribe$ = new Subject<void>();
  
    constructor(private router: Router, private routineService: RoutineService) { }
  
    ngOnInit() {
      // Obtener las rutinas del backend
      this.obtainRoutines
  
    // Metodo para obtener los ejercicios
    private obtainRoutines(){
      this.routinesService.getAllRoutines().pipe(takeUntil(this.unsubscribe$)).subscribe(
        (response) =>{
          console.log('ejercicios obtenidos correctamente');
          this.exercises = response;
        },
        (error) =>{
          console.log('Error al obtener los ejercicios', error);
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
