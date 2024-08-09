import { Routes } from '@angular/router';
import { PaginaLoginComponent } from './pages/pagina-login/pagina-login.component';
import { HomeComponent } from './pages/home/home.component';
import { CadastroDocenteComponent } from './pages/cadastro-docente/cadastro-docente.component';
import { CadastroAlunoComponent } from './pages/cadastro-aluno/cadastro-aluno.component';
import { CadastroTurmaComponent } from './pages/cadastro-turma/cadastro-turma.component';

export const routes: Routes = [
  {
    path: 'login',
    component: PaginaLoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'cadastro-docente',
    component: CadastroDocenteComponent
  },
  {
    path: 'cadastro-aluno',
    component: CadastroAlunoComponent
  },
  {
    path: 'cadastro-turma',
    component: CadastroTurmaComponent
  },
  // { path: 'inicio', component: PaginaLoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
