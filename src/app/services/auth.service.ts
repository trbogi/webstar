import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';
import * as moment from 'moment';

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
  user = new BehaviorSubject<User | null>(null)

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Applicant-Id': this.applicantId
  });

  constructor(private http: HttpClient) { }

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
    const expiresAt = moment().add(1200,'second');
    localStorage.setItem('expiresAt', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('refreshToken', resp.refreshToken);
    const user = new User(resp.user.email, resp.user.firstName, resp.user.lastName)
    this.user.next(user)
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

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    const expiration = localStorage.getItem("expiresAt");
    const expiresAt = JSON.parse(expiration!);
    return moment(expiresAt);
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("refreshToken");
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
}
