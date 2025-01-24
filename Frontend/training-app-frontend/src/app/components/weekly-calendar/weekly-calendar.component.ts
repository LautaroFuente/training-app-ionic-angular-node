import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Routine } from 'src/app/interfaces/Routine';
import { RoutineService } from 'src/app/services/routine.service';
import { WeeklyCalendarService } from 'src/app/services/weekly-calendar.service';

// Interface para cada dia y las rutinas que contiene
interface RoutinesOfDay {
  name: string;
  routines: Routine[];
}

interface RoutinesAllDays {
  days: RoutinesOfDay[];
}

@Component({
  selector: 'app-weekly-calendar',
  templateUrl: './weekly-calendar.component.html',
  styleUrls: ['./weekly-calendar.component.scss'],
  standalone: true,
  imports: [ IonicModule ],
})
export class WeeklyCalendarComponent implements OnInit{

  weekDays: any[] = []; // Días de la semana para mostrar
  routines: any[] = []; // Rutinas del usuario

  constructor(
    private routineService: RoutineService,
    private weeklyCalendarService: WeeklyCalendarService
  ) {}

  ngOnInit() {
    this.loadWeekDays();
    this.loadRoutines();
  }

  // Cargar los días de la semana desde el backend
  loadWeekDays() {
    this.weeklyCalendarService.getWeeklyCalendar(this.userId).subscribe((data: any) => {
      this.weekDays = data.days;
    });
  }

  // Cargar las rutinas del usuario
  loadRoutines() {
    this.routineService.getRoutines(this.userId).subscribe((data: any) => {
      this.routines = data;
    });
  }

  // Obtener la rutina por ID
  getRoutineById(routineId: number) {
    return this.routines.find(routine => routine.id === routineId);
  }

  // Función para permitir el arrastre de rutinas
  onDragOver(event: any, day: any) {
    event.preventDefault(); // Necesario para permitir la acción de drop
  }

  // Función que maneja el evento de soltar (drop)
  onDrop(event: any, day: any) {
    const routineId = event.dataTransfer.getData('routineId');
    this.assignRoutineToDay(day.id, routineId);
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

