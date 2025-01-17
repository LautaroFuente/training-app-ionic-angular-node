import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProgressService {

  private apiUserProgressUrl = 'http://localhost:3000/server/userProgress';

  constructor() { }

  http = inject(HttpClient);

  // Metodo para obtener las rutinas del dia y su porcentaje de completitud
  getRoutinesPercentageOfDay(userId: number, day: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    return this.http.get(`${this.apiUserProgressUrl}/day-progress-of-user/${userId}/${day}`, {headers});
  }
}
