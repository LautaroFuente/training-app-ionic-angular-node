import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { RepsExerciseDTO } from '../interfaces/reps-exercise-dto';

@Injectable({
  providedIn: 'root'
})
export class RoutineService {

  private apiRoutineUrl = 'http://localhost:3000/server/routine';

  constructor(private http: HttpClient) { }

  // Metodo para crear una rutina
  createRoutine(name: string, description: string, userId: number, listExercises: RepsExerciseDTO[]): Observable<any> {

    let data = {name, description, userId, listExercises};

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(this.apiRoutineUrl, data, {headers});
  }

  // Metodo para obtener todas las rutinas
  getAllRoutines(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get(this.apiRoutineUrl, {headers});
  }

  // Metodo para obtener todas las rutinas de un usuario
  getAllRoutinesFromOneUser(userId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get(`${this.apiRoutineUrl}/user/${userId}`, {headers});
  }
}
