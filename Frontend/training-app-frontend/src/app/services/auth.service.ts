import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiLoginUrl = '';

  constructor(private http: HttpClient) { }

  // Metodo para autentificar al usuario
  auth(email: string, password: string): Observable<any> {
    const data = {email, password};
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(this.apiLoginUrl, data, {headers});
  }
}
