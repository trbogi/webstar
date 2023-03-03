import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage: string | null = null;
  loginForm = new FormGroup({
    "username": new FormControl("", Validators.required),
    "password": new FormControl("", Validators.required)
  });

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.valid){
      const username = this.loginForm.value.username!;
      const password = this.loginForm.value.password!;
      this.authService.login(username, password).subscribe(
        (res) => this.router.navigate(['/characters']),
        (err) => this.errorMessage = err)
    }
  }

}
