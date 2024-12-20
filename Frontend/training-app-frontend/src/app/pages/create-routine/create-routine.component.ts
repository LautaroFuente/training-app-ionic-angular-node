import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExercisesService } from 'src/app/services/exercises.service';
import { IonicModule } from '@ionic/angular';
import { Exercise } from 'src/app/interfaces/Exercise';
import { Subject, takeUntil } from 'rxjs';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import { RepsExerciseDTO } from 'src/app/interfaces/reps-exercise-dto';


@Component({
  selector: 'app-create-routine',
  templateUrl: './create-routine.component.html',
  styleUrls: ['./create-routine.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class CreateRoutineComponent  implements OnInit, OnDestroy, AfterViewInit {

  swiper!: Swiper;
  exercises!: Exercise[];
  selectedExercises: RepsExerciseDTO[] = [];

  private unsubscribe$ = new Subject<void>();

  constructor(private router: Router, private exercisesService: ExercisesService) { }

  ngAfterViewInit() {
    this.initSwiper();
  }

  initSwiper() {
    this.swiper = new Swiper('.swiper-container', {
      loop: true,
      slidesPerView: 3,
      spaceBetween: 10,
      centeredSlides: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        768: {
          slidesPerView: 1,
        },
        1024: {
          slidesPerView: 2,
        },
      },
    });
  }

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

  // Se clickea card abrir formulario modal para seleccionar las opciones relacionadas al ejercicio
  onCardClick(exercise: Exercise): void {
    this.selectedExercises.push()
  }

  // Se envia formulario modal, agregar ejercicio a la lista de seleccionados
  onCardClickSubmit(): void {

  }

  // Se clickea boton de borrar de una card, eliminar dicho ejercicio de la lista de seleccionados
  onDeleteCardClick(): void {

  }

  // Se clickea para terminar la rutina y se crea dicha rutina con los ejercicios relacionados, mostrar cartel de aviso
  onSubmitFinishRoutine(): void {

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
