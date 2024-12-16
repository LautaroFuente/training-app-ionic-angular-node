import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ExercisesService } from 'src/app/services/exercises.service';
import { Exercise } from 'src/app/interfaces/exercise';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-list-exercises',
  templateUrl: './list-exercises.component.html',
  styleUrls: ['./list-exercises.component.scss'],
})
export class ListExercisesComponent  implements OnInit, OnDestroy {

  private exercises!: Exercise[];

  private unsubscribe$ = new Subject<void>();

  constructor(private router: Router, private exercisesService: ExercisesService) { }

  ngOnInit() {
    // Obtener los ejercicios del backend
    this.obtainExercises();
  }

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

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
