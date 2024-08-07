import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TurmaInterface } from '../interfaces/turma.interface';

@Injectable({
  providedIn: 'root'
})
export class TurmasService {
  
  private url = 'http://localhost:3000/turmas';

  constructor(private httpClient: HttpClient) {}

  getTurmas(): Observable<Array<TurmaInterface>> {
    return this.httpClient.get<Array<TurmaInterface>>(this.url);
  }

  numeroTurmasCadastradas(): Observable<number> {
    return this.getTurmas().pipe(
      map(turmas => turmas.length)
    );
  }
  
}
