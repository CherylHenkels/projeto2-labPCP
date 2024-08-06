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

  // getAlunosMatriculados(): UsuarioInterface[] {
  //   let alunosMatriculados: UsuarioInterface[] = [];
  // this.usuariosService.getUsuarios().subscribe((usuarios) => {
  //   const usuario = usuarios.find((usuario) => usuario.perfil === "Aluno" );
  //   if(usuario) {
  //     alunosMatriculados.push(usuario);
  //   } 
  //         return alunosMatriculados;
        
  // });
  //   }

  getAlunosMatriculados(): Observable<UsuarioInterface[]> {
    return this.usuariosService.getUsuarios().pipe(
      map((usuarios: any[]) => usuarios.filter(usuario => usuario.perfil === 'Aluno'))
    );
  }


}
  
