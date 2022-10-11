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

  getEstadoCivil() {
    return [
      {valor: 'solteiros', desc: 'Solteiro'},
      {valor: 'casado', desc: 'Casado'},
      {valor: 'deparado', desc: 'Separado'},
      {valor: 'divorciado', desc: 'Divorciado'},
      {valor: 'viuvo', desc: 'Viúvo'}
    ]
  }

  getEscolaridade() {
    return [
      {valor: 'fundamental-incompleto', desc: 'Fundamental - Incompleto'},
      {valor: 'fundamental-completo', desc: 'Fundamental - Completo'},
      {valor: 'medio-incompleto', desc: 'Médio - Incompleto'},
      {valor: 'medio-completo', desc: 'Médio - Completo'},
      {valor: 'superior-incompleto', desc: 'Superior - Incompleto'},
      {valor: 'superior-Completo', desc: 'Superior - Completo'},
      {valor: 'pos-graduação-Incompleto', desc: 'Pós-graduação - Incompleto'},
      {valor: 'pos-graduação-completo', desc: 'Pós-graduação - Completo'},
    ]
  }
}
