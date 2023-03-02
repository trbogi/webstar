import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    "username": new FormControl("", Validators.required),
    "password": new FormControl("", Validators.required)
  });

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.valid){
      const username = this.loginForm.value.username!;
      const password = this.loginForm.value.password!;
      this.authService.login(username, password).subscribe((res) => console.log(res));
    }
  }

}
