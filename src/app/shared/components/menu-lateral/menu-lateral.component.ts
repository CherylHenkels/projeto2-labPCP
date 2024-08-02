import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.css'
})
export class MenuLateralComponent {

  isMenuOpen = true;

  constructor(private router: Router) { }


abreFechaMenu() {
  this.isMenuOpen = !this.isMenuOpen;
}

navegarPara(caminho: string){
  this.router.navigate([caminho]);
}

logout() {
throw new Error('Method not implemented.');
}

}
