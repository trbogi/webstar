import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Character } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  private applicantId = 'ZhYjy245';
  private charactersUrl = 'https://developer.webstar.hu/rest/frontend-felveteli/v2/characters/';

  headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Applicant-Id': this.applicantId
    });

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<{characters: Character[]}> {
    return this.http.get<any>(this.charactersUrl, {headers: this.headers})
        .pipe(tap(resp => console.log(resp)), catchError(err => throwError(err)))
  }
}
