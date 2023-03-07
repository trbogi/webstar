import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { User } from './models/user.model';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoginComponent: boolean = false;
  user: User | null | undefined;
  backgroundImagePath!: string;

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => this.user = user);
  }

  logout(): void {
    this.authService.logout();
  }

  onRouterOutletActivate($event: any): void {
    this.isLoginComponent = $event instanceof LoginComponent;
    this.backgroundImagePath = $event.backgroundImagePath;
  }
}

