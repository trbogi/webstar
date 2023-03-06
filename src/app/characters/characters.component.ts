import { Component, OnInit } from '@angular/core';
import { Character } from '../models/character.model';
import { CharactersService } from '../services/characters.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  backgroundImagePath: string = '/../assets/images/backgrounds/bg_2@2x.png';
  characters: Character[] = [];
  selectedCharacter! : Character;
  indexOfSelectedCharacter: number = 0;

  constructor(private charactersService: CharactersService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.charactersService.getCharacters()
    .subscribe(characters => {
      this.characters = characters.characters;
      this.selectedCharacter = this.characters[0];
    });
  }

  getPreviousCharacter(): void{
    if (this.isSelectedFirst()) return;
    this.selectedCharacter = this.characters.at(this.indexOfSelectedCharacter - 1)!;
    this.indexOfSelectedCharacter = this.indexOfSelectedCharacter - 1;
  }

  getNextCharacter(): void{
    if (this.isSelectedLast()) return;
    this.selectedCharacter = this.characters.at(this.indexOfSelectedCharacter + 1)!;
    this.indexOfSelectedCharacter = this.indexOfSelectedCharacter + 1;
  }

  isSelectedFirst(): boolean{
    return this.indexOfSelectedCharacter === 0;
  }

  isSelectedLast(): boolean{
    return this.indexOfSelectedCharacter  === this.characters.length -1;
  }

}
