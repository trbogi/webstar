import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  backgroundImagePath!: string;

  onRouterOutletActivate($event: any) {
    this.backgroundImagePath = $event.backgroundImagePath;
  }
}

