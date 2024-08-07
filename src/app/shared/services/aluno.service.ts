import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioInterface } from '../interfaces/usuario.interface';
import { UsuariosService } from './usuarios.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  // private url = 'http://localhost:3000/usuarios';

  // constructor(private httpClient: HttpClient) { }

  // getAlunos(): Observable<UsuarioInterface[]> {
  //   return this.httpClient.get<UsuarioInterface[]>(this.url);
  // }

  // getAluno(id: string): Observable<UsuarioInterface> {
  //   return this.httpClient.get<UsuarioInterface>(`${this.url}/${id}`);
  // }

  // buscarAlunos(term: string): Observable<UsuarioInterface[]> {
  //   return this.httpClient.get<UsuarioInterface[]>(`${this.url}?q=${term}`);
  // }

  constructor(private usuariosService: UsuariosService) { }



  getAlunosMatriculados(): Observable<UsuarioInterface[]> {
    return this.usuariosService.getUsuarios().pipe(
      map((usuarios: any[]) => usuarios.filter(usuario => usuario.perfil === 'Aluno'))
    );
  }

  numeroAlunosMatriculados(): Observable<number> {
    return this.getAlunosMatriculados().pipe(
      map(alunos => alunos.length)
    );
  }


}
  
