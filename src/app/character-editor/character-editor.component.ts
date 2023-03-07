import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from '../models/character.model';
import { CharactersService } from '../services/characters.service';

@Component({
  selector: 'app-character-editor',
  templateUrl: './character-editor.component.html',
  styleUrls: ['./character-editor.component.scss']
})
export class CharacterEditorComponent implements OnInit {
  backgroundImagePath: string = '/../assets/images/backgrounds/bg_2@2x.png';
  characters: Character[] = [];

  constructor(private charactersService: CharactersService, private router: Router) { }

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters(): void {
    this.charactersService.getCharacters()
    .subscribe(characters => {
      let chars = characters.characters;
      chars = chars.map((c) => {
        c.name = c.name.replace('<br>', ' ');
        return c;
      });
      this.characters = chars;
    });
  }

  deleteCharacter(timestamp: number): void{
    this.characters = this.characters.filter((char) => char.createdTimestamp !== timestamp);
  }

  duplicateCharacter(timestamp: number): void{
    const character = this.characters.find((char) => char.createdTimestamp === timestamp);
    if (character){
      const timestampForNewChar = Date.now();
      const newCharacter = new Character(character.id, character.name, character.side, character.force, timestampForNewChar, character.description);
      this.characters = [...this.characters,newCharacter];
    }
   }

   updateCharacter(timestamp: number, updatedChar: Character): void{
      this.characters = this.characters.map((oldChar) => oldChar.createdTimestamp === timestamp ? updatedChar : oldChar);
   }

   goBack(){
    this.router.navigate(['/characters']);
 }

}
