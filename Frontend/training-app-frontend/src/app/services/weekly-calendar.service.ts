import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeeklyCalendarService {

  private apiWeeklyCalendarUrl = 'http://localhost:3000/server/weeklyCalendar';

  constructor( private http: HttpClient ) { }

  // Obtener el calendario de un usuario junto con los dias de dicho calendario y las rutinas de cada dia
  getWeeklyCalendar( userId: number): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const url = `${this.apiWeeklyCalendarUrl}/user/${userId}`;
    return this.http.get(url, { headers });
  }

  // Asignar al dia recibido por parametro la rutina recibida por parametro
  assignRoutineToDay( dayId: number, routineId: number ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const url = `${this.apiWeeklyCalendarUrl}/assign/${dayId}/${routineId}`;
    return this.http.get(url, { headers });
  }

  // Eliminar del dia recibido la rutina que contenga
  removeRoutineFromDay( dayId: number ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const url = `${this.apiWeeklyCalendarUrl}/remove/${dayId}`;
    return this.http.get(url, { headers });
  }
}
