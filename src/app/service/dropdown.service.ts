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
      {nome: 'DevJ', nivel: 'Junior', desc: 'Desenvolvedor Júnior'},
      {nome: 'DevP', nivel: 'Pleno', desc: 'Desenvolvedor Pleno'},
      {nome: 'DevS', nivel: 'Senior', desc: 'Desenvolvedor Sênior'}
    ]
  }

  getNewlestter() {
    return [
      {valor: 'sim', desc: 'Sim'},
      {valor: 'nao', desc: 'Não'}
    ]
  }
}
