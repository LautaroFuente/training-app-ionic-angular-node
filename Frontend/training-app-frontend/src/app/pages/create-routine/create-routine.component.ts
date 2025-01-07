import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ExercisesService } from 'src/app/services/exercises.service';
import { IonicModule } from '@ionic/angular';
import { Exercise } from 'src/app/interfaces/Exercise';
import { Subject, takeUntil } from 'rxjs';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import { RepsExerciseDTO } from 'src/app/interfaces/reps-exercise-dto';
import { ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import {IonModal} from '@ionic/angular/standalone';
import { OverlayEventDetail } from '@ionic/core/components';


@Component({
  selector: 'app-create-routine',
  templateUrl: './create-routine.component.html',
  styleUrls: ['./create-routine.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterModule, IonicModule]
})
export class CreateRoutineComponent  implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(IonModal) modal!: IonModal;
  isModalOpen: boolean = false;
  formToExercise!: FormGroup;
  sets!: number;
  repetitions!: number;
  weight!: number

  swiperToSelect!: Swiper;
  exercises!: Exercise[];
  selectedExercises: RepsExerciseDTO[] = [];
  currentlySelectedExercise!: Exercise;

  private unsubscribe$ = new Subject<void>();

  constructor(private router: Router, private exercisesService: ExercisesService, private fb: FormBuilder) { }

  ngAfterViewInit() {
    this.initSwiper();
  }

  initSwiper() {
    this.swiperToSelect = new Swiper('.swiper-container-to-select', {
      loop: true,
      slidesPerView: 3,
      spaceBetween: 10,
      centeredSlides: true,
      pagination: {
        el: '.swiper-pagination-to-select',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-to-select-button-next',
        prevEl: '.swiper-to-select-button-prev',
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
    // Crear formulario del modal
    this.formToExercise = this.fb.group({
      sets: [1, [Validators.required, Validators.min(1)]],
      repetitions: [1, [Validators.required, Validators.min(1)]],
      weight: [1, [Validators.required, Validators.min(1)]],
    });

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
    this.isModalOpen = true;
    this.currentlySelectedExercise = exercise;
  }

  // Se envia formulario modal, agregar ejercicio a la lista de seleccionados
  onCardClickSubmit(sets: number, repetitions: number, weight: number): void {
    let repsExercise: RepsExerciseDTO  = {
      exercise: this.currentlySelectedExercise,
      repetitions: repetitions,
      sets: sets,
      weight: weight,
    };
    this.selectedExercises.push(repsExercise);
  }

  // Se clickea boton de borrar de una card, eliminar dicho ejercicio de la lista de seleccionados
  onDeleteCardClick(repsExercise: RepsExerciseDTO): void {

  }

  // Se clickea para terminar la rutina y se crea dicha rutina con los ejercicios relacionados, mostrar cartel de aviso
  onSubmitFinishRoutine(): void {

  }

  cancel() {
    this.isModalOpen = false;
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    if(this.formToExercise.valid){
      const {sets, repetitions, weight} = this.formToExercise.value;
      this.modal.dismiss({sets, repetitions, weight}, 'confirm');
      this.isModalOpen = false;
    }else {
      console.log('Formulario no válido'); 
    }
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      const { sets, repetitions, weight } = event.detail.data;
      this.onCardClickSubmit(sets, repetitions, weight);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
