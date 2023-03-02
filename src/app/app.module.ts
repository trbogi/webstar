import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthTokenInterceptor } from './login/authTokenInterceptor';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { CharactersComponent } from './characters/characters.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CharactersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true,
      deps: [AuthService, Router]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
