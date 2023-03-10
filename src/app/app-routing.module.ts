import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CharacterEditorComponent } from './character-editor/character-editor.component';
import { CharactersComponent } from './characters/characters.component';
import { LoginGuard } from './login.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'characters', component: CharactersComponent,  canActivate: [AuthGuard]},
  {path: 'editor', component: CharacterEditorComponent,  canActivate: [AuthGuard]},
  {path: '', redirectTo: '/characters', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
