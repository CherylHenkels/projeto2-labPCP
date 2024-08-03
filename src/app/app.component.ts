import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { MenuLateralComponent } from "./shared/components/menu-lateral/menu-lateral.component";
import { PaginaLoginService } from './shared/services/pagina-login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MenuLateralComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'labPCP';
  constructor(public router: Router, public paginaLoginService: PaginaLoginService) {}

  get isLoggedIn(): boolean {
    return this.paginaLoginService.isLoggedIn();
  }

  // get userProfile(): string | null {
  //   return this.paginaLoginService.getPerfil();
  // }
}
