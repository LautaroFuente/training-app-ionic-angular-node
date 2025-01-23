import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { Routine } from 'src/app/interfaces/Routine';
import { RoutineService } from 'src/app/services/routine.service';
import { RoutinesListComponent } from 'src/app/components/routines-list/routines-list.component';
import Swiper from 'swiper';
import { GlobalUserService } from 'src/app/services/global-user.service';
import { WeeklyCalendarComponent } from "../../components/weekly-calendar/weekly-calendar.component";

@Component({
  selector: 'app-scheduler-routines',
  templateUrl: './scheduler-routines.component.html',
  styleUrls: ['./scheduler-routines.component.scss'],
  standalone: true,
  imports: [IonicModule, RoutinesListComponent, WeeklyCalendarComponent],
})
export class SchedulerRoutinesComponent  implements OnInit, OnDestroy, AfterViewInit {

  private unsubscribe$ = new Subject<void>();
  routines!: Routine[];
  swiper!: Swiper;

  constructor( private router: Router, private routineService: RoutineService, private globalUser: GlobalUserService) { }

  ngOnInit() {
    // Llamar a metodo para obtener las rutinas que el usuario creo
    this.obtainRoutineFromUser();
  }

  // Iniciar swiper
  ngAfterViewInit() {

    this.initSwiper();
  }

  // Metodo para iniciar y configurar el swiper
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

  // Metodo para obtener las rutinas que ese usuario creo
  obtainRoutineFromUser(): void {
    // Obtener el id del usuario por medio del servicio correspondiente
    const userId = this.globalUser.getId();

    // Hacer la peticion por medio del servicio correspondiente
    this.routineService.getAllRoutinesFromOneUser(userId).pipe(takeUntil(this.unsubscribe$)).subscribe(
      (response) =>{
        console.log('rutinas obtenidas correctamente');
        this.routines = response;
      },
      (error) =>{
        console.log('Error al obtener las rutinas', error);
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
