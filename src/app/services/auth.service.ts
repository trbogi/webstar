import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';

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
          this.handleLogin(respData.token, respData.refreshToken, respData.user)
        )
    );
  }
  private handleLogin(token: string, refreshToken: string, user: AuthResponseData["user"] ): void {
    throw new Error('Method not implemented.');
  }

  private handleError(errorResp: HttpErrorResponse){
    let errorMessage = 'Ismeretlen hiba történt.'
    if (!errorResp.error || !errorResp.error.error){
      return throwError(errorMessage)
    }
    switch (errorResp.error.status) {
      case 400:
        errorMessage = 'Hiba bejelentkezéskor.'
        break
      case 405:
        errorMessage = 'Hiba bejelentkezéskor.'
        break
      case 500:
        errorMessage = errorResp.error.error.message
        break
    }
    return throwError(errorMessage)
  }
}
