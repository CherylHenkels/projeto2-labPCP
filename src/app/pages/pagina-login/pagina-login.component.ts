import { Component } from '@angular/core';
import { PaginaLoginService } from '../../shared/services/pagina-login.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../shared/services/usuarios.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagina-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './pagina-login.component.html',
  styleUrl: './pagina-login.component.css'
})


export class PaginaLoginComponent {

  login = {
    email: '',
    senha: ''
  };

  constructor(private paginaLoginService: PaginaLoginService,private usuariosService: UsuariosService, private router: Router) {}

  entrar() {
     

   this.usuariosService.getUsuarios().subscribe((usuarios) => {
      const usuario = usuarios.find((usuario) => usuario.email === this.login.email && usuario.senha === this.login.senha);
      if(usuario) {
        // this.paginaLoginService.login(this.login);
        window.alert('Usuario logado');
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 500);
      } else {
        window.alert('Usuário e/ou senha incorretos');
  }
 });
  }

  criarConta() {
    alert("Funcionalidade em construção");
  }

 esqueciSenha(event:Event) {
    event.preventDefault(); // para não sair da página de login
    alert("Funcionalidade em construção");
  }


}


