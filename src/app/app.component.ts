import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user.model';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user: User | null | undefined;
  backgroundImagePath!: string;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => this.user = user);
    console.log(this.user)
  }

  logout(): void {
    this.authService.logout();
  }

  onRouterOutletActivate($event: any): void {
    this.backgroundImagePath = $event.backgroundImagePath;
  }
}

