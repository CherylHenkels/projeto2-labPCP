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
    senha: '',
    perfil: '',
    nome: ''
  };

  constructor(private paginaLoginService: PaginaLoginService,private usuariosService: UsuariosService, private router: Router) {}

  entrar() {
     

   this.usuariosService.getUsuarios().subscribe((usuarios) => {
      const usuario = usuarios.find((usuario) => usuario.email === this.login.email && usuario.senha === this.login.senha);
      if(usuario) {
        this.paginaLoginService.getPerfil(usuario.email).subscribe(perfil => {
          if (perfil) {
            console.log('O perfil do usuário é:', perfil); // Imprimirá "Administrador", "Docente" ou "Aluno"

            this.login.perfil = perfil.perfil;
            this.login.nome = perfil.nome;
            

          } else {
            console.error('Usuário não encontrado');
          }
        });
       

 
        setTimeout(() => {

          // console.log("login:" + this.login.email);
          // console.log("senha" + this.login.senha);
          // console.log("perfil" +this.login.perfil);
          // console.log("nome" +this.login.nome);

          this.paginaLoginService.login(this.login);
          this.router.navigate(['/home']);
        }, 300);
        setTimeout(() => {
          window.alert('Usuário logado com sucesso!');
        }, 600);
        
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


