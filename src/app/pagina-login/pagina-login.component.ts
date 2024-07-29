import { Component } from '@angular/core';
import { PaginaLoginService } from '../shared/services/pagina-login.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagina-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pagina-login.component.html',
  styleUrl: './pagina-login.component.css'
})


export class PaginaLoginComponent {
onSubmit() {
console.log("teste")
}
criarConta() {
console.log("teste")
}
esqueciSenha() {
console.log("teste")
}

  login = {
    email: '',
    senha: ''
  };

  constructor(private paginaLoginService: PaginaLoginService, private router: Router) {}

  // entrar() {
  //   if(this.login.email && this.login.senha) {
  //     this.paginaLoginService.login(this.login);
  //     window.alert('Usuario logado');
  //     setTimeout(() => {
  //       this.router.navigate(['/home']);
  //     }, 500);
  //   } else {
  //     window.alert('Por favor, preencha os campos');
  //   }

  //   console.log('Entrou')
  // }

  // cadastrar() {
  //   console.log('Clicou em Cadastrar');
  // }


}


