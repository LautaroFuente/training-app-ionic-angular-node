import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ExercisesService } from 'src/app/services/exercises.service';
import { Exercise } from 'src/app/interfaces/Exercise';
import { Subject, takeUntil } from 'rxjs';
import { IonicModule } from '@ionic/angular';
import { ExerciseListComponent } from 'src/app/components/exercise-list/exercise-list.component';

@Component({
  selector: 'app-list-exercises',
  templateUrl: './list-exercises.component.html',
  styleUrls: ['./list-exercises.component.scss'],
  standalone: true,
  imports: [IonicModule, ExerciseListComponent],
})
export class ListExercisesComponent  implements OnInit, OnDestroy {

  exercises!: Exercise[];

  private unsubscribe$ = new Subject<void>();

  constructor(private router: Router, private exercisesService: ExercisesService) { }

  ngOnInit() {
    // Obtener los ejercicios del backend
    this.obtainExercises();
  }

  // Metodo para obtener los ejercicios
  private obtainExercises(){
    this.exercisesService.getAllExercises().pipe(takeUntil(this.unsubscribe$)).subscribe(
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
