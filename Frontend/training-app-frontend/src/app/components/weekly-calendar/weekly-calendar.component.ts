import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Routine } from 'src/app/interfaces/Routine';
import { GlobalUserService } from 'src/app/services/global-user.service';
import { RoutineService } from 'src/app/services/routine.service';
import { WeeklyCalendarService } from 'src/app/services/weekly-calendar.service';

// Interface para cada dia y las rutinas que contiene
interface RoutinesOfDay {
  name: string;
  routines: Routine[];
}

@Component({
  selector: 'app-weekly-calendar',
  templateUrl: './weekly-calendar.component.html',
  styleUrls: ['./weekly-calendar.component.scss'],
  standalone: true,
  imports: [ IonicModule ],
})
export class WeeklyCalendarComponent implements OnInit{

  weekDays: RoutinesOfDay[] = []; // Días de la semana con su nombre y una lista de sus rutinas para mostrar

  constructor(
    private weeklyCalendarService: WeeklyCalendarService,
    private globalUserService: GlobalUserService
  ) {}

  ngOnInit() {
    this.loadWeekDays();
  }

  // Cargar los días de la semana junto con sus rutinas desde el backend
  loadWeekDays() {
    // Obtener el id del usuario activo
    const userId = this.globalUserService.getId();

    // Llamar al servicio para hacer la peticion
    this.weeklyCalendarService.getWeeklyCalendar(userId).subscribe((data: any[]) => {
      // Transformar los datos para ajustarlos a la estructura de RoutinesOfDay
      this.weekDays = data.map((day) => {
        // Si el día tiene una rutina asociada, incluirla en la propiedad "routines"
        const routines = day.routine ? [day.routine] : [];

        return {
          name: day.name,
          routines: routines, // Asignar la rutina si existe, sino es un arreglo vacío
        };
      });
    });
  }

  // Asignar una rutina a un día
  assignRoutineToDay(dayId: number, routineId: number) {
    this.weeklyCalendarService.assignRoutineToDay(dayId, routineId).subscribe(() => {
      this.loadWeekDays(); // Recargar los días con las rutinas asignadas
    });
  }

  // Función para eliminar una rutina de un día
  removeRoutineFromDay(dayId: number) {
    this.weeklyCalendarService.removeRoutineFromDay(dayId).subscribe(() => {
      this.loadWeekDays(); // Recargar los días con las rutinas actualizadas
    });
  }
}

