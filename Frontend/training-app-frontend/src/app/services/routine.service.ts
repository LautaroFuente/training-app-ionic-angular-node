import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { RepsExerciseDTO } from '../interfaces/reps-exercise-dto';

@Injectable({
  providedIn: 'root'
})
export class RoutineService {

  private apiRoutineUrl = '';

  constructor(private http: HttpClient) { }

  createRoutine(name: string, description: string, userId: number, listExercises: RepsExerciseDTO[]): Observable<any> {

    let data = {name, description, userId, listExercises};

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(this.apiRoutineUrl, data, {headers});
  }
}
