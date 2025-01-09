import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalUserService {
  private name :string = "";
  private email :string = "";
  private token :string = "";
  private id :number = 0;

  private apiDeleteUserUrl = 'http://localhost:3000/server/user/delete/';

  constructor(private http: HttpClient) {}

  login(name: string, email: string, token: string, id: number ) {
    this.name = name;
    this.email = email;
    this.token = token;
    this.id = id;
  }

  logout() {
    this.name = "";
    this.email = "";
    this.token = "";
    this.id = 0;
  }

  deleteAccount(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const emailUserToDelete = this.email;
    this.logout();
    return this.http.delete(`${this.apiDeleteUserUrl}${emailUserToDelete}`,{ headers });
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getToken(): string {
    return this.token;
  }

  getId(): number {
    return this.id;
  }
}
