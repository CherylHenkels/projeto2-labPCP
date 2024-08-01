import { Routes } from '@angular/router';
import { PaginaLoginComponent } from './pages/pagina-login/pagina-login.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: 'login',
    component: PaginaLoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  // { path: 'inicio', component: PaginaLoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
