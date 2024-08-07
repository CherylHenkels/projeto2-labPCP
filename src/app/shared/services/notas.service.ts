import { Injectable } from '@angular/core';
import { NotaInterface } from '../interfaces/nota.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  private url = 'http://localhost:3000/notas';

  constructor(private httpClient: HttpClient) {}

  getNotas(){
    return this.httpClient.get<Array<NotaInterface>>(this.url);
  }


}
