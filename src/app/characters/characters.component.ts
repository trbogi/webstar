import { Component, OnInit } from '@angular/core';
import { Character } from '../models/character.model';
import { CharactersService } from '../services/characters.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  characters: Character[] = [];
  selectedCharacter! : Character;

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

}
