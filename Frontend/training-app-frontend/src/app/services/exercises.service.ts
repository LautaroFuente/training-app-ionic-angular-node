import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {

  private apiExercisesUrl = 'http://localhost:3000/server/exercise';

  constructor(private http: HttpClient) { }

  getAllExercises(): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get(this.apiExercisesUrl, {headers});
  }
}
