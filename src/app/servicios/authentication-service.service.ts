import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, switchMap, throwError } from 'rxjs';
import { Users } from '../interfaces/users';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  private apiUrl = 'http://localhost:3000'; 
  private currentUserKey = '';
  constructor(private http: HttpClient) { }

  signup(userData: Users): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, userData);
  }

  login1(userData: Login): Observable<any> {
    // Primero, obtener la lista de usuarios
    return this.http.get<any[]>(`${this.apiUrl}/users`).pipe(
      map(users => {
        // Verificar si el usuario y contraseña coinciden con algún usuario registrado
        const user = users.find(user => user.email === userData.email && user.password === userData.password);
        if (user) {
          // Usuario encontrado, devolver el usuario
          return user;
        } else {
          // Usuario no encontrado, devolver un error
          throw new Error('Usuario no registrado');
        }
      }),
      catchError(error => {
        // Manejar el error
        return of({ error: error.message });
      })
    );
  }

  login2(userData: Login): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/users`).pipe(
      map(users => {
        const user = users.find(user => user.email === userData.email && user.password === userData.password);
        if (user) {
          localStorage.setItem(this.currentUserKey, JSON.stringify(user));
          return user;
        } else {
          throw new Error('Usuario no registrado');
        }
      })
    );
  }

  login(userData: Login): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/users`).pipe(
      map(users => {
        const user = users.find(user => user.email === userData.email && user.password === userData.password);
        if (user) {
          localStorage.setItem(this.currentUserKey, JSON.stringify(user));
          return user;
        } else {
          throw new Error('Usuario no registrado');
        }
      }),
      catchError(error => {
        return throwError(error); // Emitir el error
      })
    );
  }

  isUserLoggedIn(): boolean {
    // Obtener el usuario actual del almacenamiento local
    const currentUser = localStorage.getItem(this.currentUserKey);
    // Devolver true si hay un usuario actual, de lo contrario, devolver false
    return currentUser !== null;
  }


  logout() {
    localStorage.removeItem(this.currentUserKey);

  }

  getCurrentUser(): any {
    const currentUser = localStorage.getItem(this.currentUserKey);
    return currentUser ? JSON.parse(currentUser) : null;
  }


  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.apiUrl}/users`);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }

  updateUser(userData: Users): Observable<Users> {
    return this.http.put<Users>(`${this.apiUrl}/users/${userData.id}`, userData).pipe(
      catchError(error => {
        console.error('Error al actualizar el usuario', error);
        return throwError(error);
      })
    );
  }

}
