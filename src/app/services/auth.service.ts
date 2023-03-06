import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';

export interface AuthResponseData{
  token: string,
  refreshToken: string,
  user: {
      email: string,
      firstName: string,
      lastName: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'https://developer.webstar.hu/rest/frontend-felveteli/v2/authentication/'
  private applicantId = 'ZhYjy245'
  user = new BehaviorSubject<User | null>(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null);

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Applicant-Id': this.applicantId
  });

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string){
    return this.http.post<AuthResponseData>(this.loginUrl, {username, password}, {headers: this.headers})
      .pipe(
        catchError(this.handleError),
        tap(respData =>
          this.handleLogin(respData)
        )
    );
  }

  private handleLogin(resp: AuthResponseData ): void {
    localStorage.setItem('token', resp.token);
    const user = new User(resp.user.email, resp.user.firstName, resp.user.lastName);
    localStorage.setItem('user', JSON.stringify(user));
    this.user.next(user);
  }

  private handleError(errorResp: HttpErrorResponse){
    let errorMessage = 'Ismeretlen hiba történt.'
    switch (errorResp.status) {
      case 400:
        errorMessage = 'Hiba bejelentkezéskor.';
        break;
      case 405:
        errorMessage = 'Hiba bejelentkezéskor.';
        break;
      case 500:
        errorMessage = errorResp.error.error;
        break;
    }
    return throwError(errorMessage);
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  logout(): void {
    localStorage.clear();
    this.user.next(null);
    this.router.navigate(['/login']);
  }

  getUser(): void {
    if (this.isLoggedIn()){
      const user = JSON.parse(localStorage.getItem('user')!);
      this.user.next(user);
    }else{
      this.user.next(null);
    }
  }
}
