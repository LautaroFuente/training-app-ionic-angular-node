import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiRegisterUrl = '';

  constructor(private http: HttpClient) { }

  // Metodo para registrar un nuevo usuario
  register (name: string, email: string, gender: string = 'N', password: string): Observable<any> {
    const data = { name, email, gender, password};
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(this.apiRegisterUrl, data, {headers});
  }
}
