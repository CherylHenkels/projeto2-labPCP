import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { UsuarioInterface } from '../interfaces/usuario.interface';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaginaLoginService {

  constructor(private httpClient: HttpClient) { }

  private url = 'http://localhost:3000/usuarios';

  login(usuario: { email: string, senha: string, perfil: string, nome: string }) {
    sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));
  }

  logout() {
    sessionStorage.removeItem('usuarioLogado');
  }

  


  getPerfil(email: string): Observable<UsuarioInterface | null> {
    return this.httpClient.get<UsuarioInterface>(this.url) // Expect a single Usuario object
    .pipe(
      map(usuario => { // Handle both single object and array scenarios
        if (Array.isArray(usuario)) {
          return usuario.find(u => u.email === email);
        } else {
          return usuario.email === email ? usuario : null; // Check for matching email
        }
      }),
      catchError(() => of(null)) // Handle errors
    );
}

  isLoggedIn(): boolean {
    return sessionStorage.getItem('usuarioLogado') !== null;
  }
}
