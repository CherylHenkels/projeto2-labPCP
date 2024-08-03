import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PaginaLoginService } from '../../services/pagina-login.service';
import { MenuLateralService } from '../../services/menu-lateral.service';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.css'
})
export class MenuLateralComponent {

  isMenuOpen = true;
  // perfilLogado: string;

  


  constructor(private router: Router, public paginaLoginService: PaginaLoginService, public menuLateralService: MenuLateralService) {
    // this.perfilLogado = this.menuLateralService.getPerfilUsuarioLogado()
   }



   // Imprimirá "Administrador", "Docente" ou "Aluno"


abreFechaMenu() {
  this.isMenuOpen = !this.isMenuOpen;
}

navegarPara(caminho: string){
  this.router.navigate([caminho]);
}

logout() {
  this.paginaLoginService.logout();
  this.router.navigate(['/login']);
}

get isAdmin(): boolean {
  let perfilLogado = this.menuLateralService.getPerfilUsuarioLogado();
  // console.log("dentro do isAdmin " + perfilLogado);
  return perfilLogado === 'Administrador';
}

get isDocente(): boolean {
  let perfilLogado = this.menuLateralService.getPerfilUsuarioLogado();
  // console.log("dentro do isDocente " + perfilLogado);
  return perfilLogado === 'Docente';
}

get isAluno(): boolean {
let perfilLogado = this.menuLateralService.getPerfilUsuarioLogado();
  // console.log("dentro do isAluno " + perfilLogado);
  return perfilLogado === 'Aluno';
}
}
