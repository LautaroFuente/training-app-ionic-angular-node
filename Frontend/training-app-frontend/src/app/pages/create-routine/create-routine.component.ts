import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExercisesService } from 'src/app/services/exercises.service';
import { IonicModule } from '@ionic/angular';
import { Exercise } from 'src/app/interfaces/Exercise';
import { Subject, takeUntil } from 'rxjs';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';


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

  private unsubscribe$ = new Subject<void>();

  constructor(private router: Router, private exercisesService: ExercisesService) { }

  ngAfterViewInit() {
    this.iniciarSwiper();
  }

  iniciarSwiper() {
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

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
