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

  login(usuario: { email: string, senha: string, perfil: string }) {
    sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));
  }

  logout() {
    sessionStorage.removeItem('usuarioLogado');
  }

  

  // getPerfil(email: string): Observable<string> {
  //   return this.httpClient.get<{ usuarios: UsuarioInterface[] }>(this.url).pipe(
  //     map(data => {
  //       console.log('Received data:', data);
  //        const usuarioBuscado = data.usuarios.find(u => u.email === email);
  //        if (usuarioBuscado) {
  //         return usuarioBuscado.perfil;
  //     } else {
  //         throw new Error(`Usuário com email ${email} não encontrado.`);
  //     }
  //       // const foundUser = data.usuarios.find(u => u.email === email);
  //       console.log("passou aqui");
  //       // return usuarioBuscado? usuarioBuscado.perfil : '';
  //     }),
  //   );
  // }

  // getPerfil(email: string): Observable<string > {
  //   return this.httpClient.get<{ usuarios: UsuarioInterface[] }>(this.url).pipe(
  //     map(data => {
  //       console.log('Received data:', data);
  //       console.log('Received data:', data.usuarios);
  //       if (data && data.usuarios) { // Check if data exists and has 'usuarios' property
  //         const usuarioBuscado = data.usuarios.find(u => u.email === email);
  //         if (usuarioBuscado) {
  //           return usuarioBuscado.perfil;
  //         } else {
  //           throw new Error(`Usuário com email ${email} não encontrado.`);
  //         }
  //       } else {
  //         console.error('Error: Data or usuarios property not found');
  //         return " "; // Or return a default value like '' or null
  //       }
  //     }),
  //   );
  // }

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
