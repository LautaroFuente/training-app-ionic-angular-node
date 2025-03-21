import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalUserService } from './global-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
    
  private token: string | null = null; 

  constructor(private globalUser: GlobalUserService) { }

  // Interceptor para agregar el token en el encabezado de la solicitud si la url no esta entre las excluidas
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

    if (this.isExcludedUrl(req.url)) {
      return next.handle(req);
    }

    let token = this.globalUser.getToken();

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned);
    }
    else{
      return next.handle(req);
    }

  }

  // Método para comprobar si la URL debe ser excluida
  private isExcludedUrl(url: string): boolean {
    const excludedUrls = ['http://localhost:3000/server/auth/login', 'http://localhost:3000/server/user/register'];
    return excludedUrls.some(excludedUrl => url.includes(excludedUrl));
  }
}
