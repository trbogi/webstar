import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    return this.http.post<AuthResponseData>(this.loginUrl, {username, password}, {headers: this.headers});
  }
}
