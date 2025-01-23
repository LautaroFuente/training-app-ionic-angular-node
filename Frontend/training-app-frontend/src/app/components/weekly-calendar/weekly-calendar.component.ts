import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Routine } from 'src/app/interfaces/Routine';

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
export class WeeklyCalendarComponent {
  // Días de la semana
  daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  // Rutinas asignadas a cada día
  routines: RoutinesAllDays = {
    days: [
      {name:"Lunes", routines: [] },
      {name:"Martes", routines: [] },
      {name:"Miércoles", routines: [] },
      {name:"Jueves", routines: [] },
      {name:"Viernes", routines: [] },
      {name:"Sábado", routines: [] },
      {name:"Domingo", routines: [] },
    ]
  };

  constructor() { }

  // Método para agregar una rutina al día
  addRoutineToDay(day: string) {
    const routineName = prompt('Introduce el nombre de la rutina:');
    if (routineName) {
      //this.routines[day].push({ name: routineName });
    }
  }
}

