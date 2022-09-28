import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IEstadosBr } from '../model/i-estados-br';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  allEstados!: IEstadosBr[]

  constructor(
    private http: HttpClient
  ) { }

  getEstadosBr(): Observable<IEstadosBr[]> {
    return this.http.get<IEstadosBr[]>('assets/dados/estados-br.json')
  }

  getCargos() {
    return [
      {nome: 'DevJ', nivel: 'Junior', desc: 'Dev Jr'},
      {nome: 'DevP', nivel: 'Pleno', desc: 'Dev Pl'},
      {nome: 'DevS', nivel: 'Senior', desc: 'Dev Sr'}
    ]
  }

  getTecnologias() {
    return [
      {nome: 'java', desc: 'Java'},
      {nome: 'javascript', desc: 'JavaScript'},
      {nome: 'php', desc: 'PHP'},
      {nome: 'ruby', desc: 'Ruby'}
    ]
  }
}
