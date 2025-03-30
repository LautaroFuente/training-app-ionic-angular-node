import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  inject,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ExercisesService } from 'src/app/services/exercises.service';
import { IonicModule } from '@ionic/angular';
import { Exercise } from 'src/app/interfaces/Exercise';
import { Subject, takeUntil } from 'rxjs';
import Swiper from 'swiper';
import { RepsExerciseDTO } from 'src/app/interfaces/reps-exercise-dto';
import { ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { RoutineService } from 'src/app/services/routine.service';
import { GlobalUserService } from 'src/app/services/global-user.service';
import { ExerciseCardComponent } from 'src/app/components/exercise-card/exercise-card.component';
import { SelectedExerciseCardComponent } from 'src/app/components/selected-exercise-card/selected-exercise-card.component';
import { ModalFormExerciseComponent } from 'src/app/components/modal-form-exercise/modal-form-exercise.component';
import { FormRoutineComponent } from 'src/app/components/form-routine/form-routine.component';

@Component({
  selector: 'app-create-routine',
  templateUrl: './create-routine.component.html',
  styleUrls: ['./create-routine.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    IonicModule,
    ExerciseCardComponent,
    SelectedExerciseCardComponent,
    ModalFormExerciseComponent,
    FormRoutineComponent,
  ],
})
export class CreateRoutineComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  // Modal para formulario de ejercicio
  @ViewChild(ModalFormExerciseComponent) modal!: ModalFormExerciseComponent;

  swiperToSelect!: Swiper;
  swiperSelected!: Swiper;

  exercises!: Exercise[];
  selectedExercises: RepsExerciseDTO[] = [];
  currentlySelectedExercise!: Exercise;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private router: Router,
    private exercisesService: ExercisesService,
    private fb: FormBuilder
  ) {}
  toastController = inject(ToastController);
  routineService = inject(RoutineService);
  globalUserService = inject(GlobalUserService);

  ngAfterViewInit() {
    // Iniciar swiper de ejercicios a seleccionar
    this.initSwiperToSelect();

    // Iniciar swiper de ejercicios seleccionados
    this.initSwiperSelected();
  }

  initSwiperToSelect() {
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

  initSwiperSelected() {
    this.swiperSelected = new Swiper('.swiper-container-selected', {
      loop: true,
      slidesPerView: 3,
      spaceBetween: 10,
      centeredSlides: true,
      pagination: {
        el: '.swiper-selected-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-selected-button-next',
        prevEl: '.swiper-selected-button-prev',
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

  private obtainExercises() {
    this.exercisesService
      .getAllExercises()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (response) => {
          console.log('ejercicios obtenidos correctamente');
          this.exercises = response;
        },
        (error) => {
          console.log('Error al obtener los ejercicios', error);
        }
      );
  }

  // Se clickea card abrir formulario modal para seleccionar las opciones relacionadas al ejercicio
  onCardClick(exercise: Exercise): void {
    this.modal.isModalOpen = true;
    this.currentlySelectedExercise = exercise;
  }

  // Se envia formulario modal, agregar ejercicio a la lista de seleccionados
  onCardClickSubmit(data: {
    sets: number;
    repetitions: number;
    weight: number;
  }): void {
    let repsExercise: RepsExerciseDTO = {
      exercise: this.currentlySelectedExercise,
      repetitions: data.repetitions,
      sets: data.sets,
      weight: data.weight,
    };
    this.selectedExercises.push(repsExercise);
  }

  // Se clickea boton de borrar de una card, eliminar dicho ejercicio de la lista de seleccionados
  onDeleteCardClick(repsExercise: RepsExerciseDTO): void {
    this.selectedExercises = this.selectedExercises.filter(
      (exercise) => exercise.exercise.id != repsExercise.exercise.id
    );
  }

  // Se clickea para terminar la rutina y se crea dicha rutina con los ejercicios relacionados, mostrar cartel de aviso
  onSubmitFinishRoutine(data: { name: string; description: string }): void {
    // Veo si hay ejercicios agregados
    if (this.selectedExercises.length > 0) {
      // Obtengo el id del usuario que quiere crear la rutina
      let userId = this.globalUserService.getId();

      // Creo la rutina
      this.routineService
        .createRoutine(
          data.name,
          data.description,
          userId,
          this.selectedExercises
        )
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (response) => {
            console.log('rutina creada correctamente');
            this.presentSuccessCreateRoutine();
          },
          (error) => {
            console.log('Error al crear la rutina', error);
            this.presentErrorCreateRoutine();
          }
        );
    } else {
      console.log('Rutina sin ejercicios');
      this.presentErrorCreateRoutine();
    }
  }

  // Metodo para volver atras
  goBack() {
    this.router.navigate(['/login-menu']);
  }

  // Desuscribirse de todas las subscripciones activas al destruirse el componente
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // Logica para manejar mensaje de error o de exito al intentar crear una rutina
  async presentSuccessCreateRoutine() {
    const toast = await this.toastController.create({
      message: '¡Rutina creada con éxito!',
      duration: 3000,
      color: 'success',
      position: 'bottom',
      buttons: [
        {
          side: 'end',
          text: 'Cerrar',
          role: 'cancel',
          handler: () => {
            console.log('Toast cerrado');
          },
        },
      ],
    });
    toast.present();
  }

  async presentErrorCreateRoutine() {
    const toast = await this.toastController.create({
      message: '¡Hubo un error al crear la rutina!',
      duration: 3000,
      color: 'danger',
      position: 'bottom',
      buttons: [
        {
          side: 'end',
          text: 'Cerrar',
          role: 'cancel',
          handler: () => {
            console.log('Toast cerrado');
          },
        },
      ],
    });
    toast.present();
  }
}
