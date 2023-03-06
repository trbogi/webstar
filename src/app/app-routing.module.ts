import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CharacterEditorComponent } from './character-editor/character-editor.component';
import { CharactersComponent } from './characters/characters.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'characters', component: CharactersComponent,  canActivate: [AuthGuard]},
  {path: 'editor', component: CharacterEditorComponent,  canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
