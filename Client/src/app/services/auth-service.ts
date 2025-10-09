import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from '../models/api-response';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = "http://localhost:5000/api/account";
  private token = "token";

  private httpClient = inject(HttpClient);

  register(data:FormData):Observable<ApiResponse<string>>{
    return this.httpClient.post<ApiResponse<string>>(`${this.baseUrl}/register`, data).pipe(tap((response)=>{
      localStorage.setItem(this.token, response.data)
    }));
  }

  login(email: string, password: string): Observable<ApiResponse<string>> {
    return this.httpClient
      .post<ApiResponse<string>>(`${this.baseUrl}/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          if (response.isSuccess) {
            localStorage.setItem(this.token, response.data)
          }

          return response;
        })
      )
  }
  
  me(): Observable<ApiResponse<User>> {
    return this.httpClient.get<ApiResponse<User>>(`${this.baseUrl}/me`, {
      headers: {
        Authorization: `Bearer ${this.getAccessToken}`,
      },
    })
    .pipe(tap((response) =>{
      if(response.isSuccess)
      {
        localStorage.setItem("user", JSON.stringify(response.data))
      }
    }))
  }
  get getAccessToken(): string | null {
    return localStorage.getItem(this.token) || '';
  }
  isLogedIn(): boolean {
    return !!localStorage.getItem(this.token)
  }

  logout() {
    localStorage.removeItem(this.token)
    localStorage.removeItem('user')
  }

  get currentLoggedUser(): User | null {
    const user: User = JSON.parse(localStorage.getItem('user') || '{}')
    console.log('currentLogedUser:', user)
    return user;
  }
}