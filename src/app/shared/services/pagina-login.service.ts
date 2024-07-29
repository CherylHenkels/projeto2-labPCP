import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginaLoginService {

  constructor() { }

  login(usuario: {email: string, senha: string}) {
    sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));
  }

  logout() {
    sessionStorage.removeItem('usuarioLogado');
  }
}
