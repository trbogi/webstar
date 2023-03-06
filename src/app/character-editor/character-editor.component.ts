import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-character-editor',
  templateUrl: './character-editor.component.html',
  styleUrls: ['./character-editor.component.scss']
})
export class CharacterEditorComponent implements OnInit {
  backgroundImagePath: string = '/../assets/images/backgrounds/bg_2@2x.png';

  constructor() { }

  ngOnInit(): void {
  }

}
