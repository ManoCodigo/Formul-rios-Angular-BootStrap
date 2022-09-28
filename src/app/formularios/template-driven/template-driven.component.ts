import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConsultaCepService } from 'src/app/service/consulta-cep.service';
import { IEstadosBr } from 'src/app/model/i-estados-br';
import { DropdownService } from 'src/app/service/dropdown.service';

@Component({
  selector: 'app-template-driven',
  templateUrl: './template-driven.component.html',
  styleUrls: ['./template-driven.component.scss']
})
export class TemplateDrivenComponent implements OnInit {

  public naoEncontrado: boolean = false
  public estadoBr!: IEstadosBr[]
  public inscricao_EstadoBr!: Subscription

  constructor(
    private consultaCepService: ConsultaCepService,
    private dropdownService: DropdownService
  ) { }

  ngOnInit(): void {
    this.inscricao_EstadoBr = this.dropdownService.getEstadosBr().subscribe(
      (dados: IEstadosBr[]) => this.estadoBr = dados
    )
  }

  public onEnviar(form: any) {
    console.log(form.value)
    form.reset()
  }

  validacoes(compa: any) {
    return !compa.valid && compa.touched
  }

  onConsultaCEP(cep: string, form: any) {
    if (cep != null && cep !== '') {
      this.consultaCepService.consultaCEP(cep)?.subscribe(
        (dados: any) => this.populaDados(dados, form)
      )
    }
  }

  populaDados(dados: any, form: any) {
    form.form.patchValue({
      endereco: {
        cep: dados.cep,
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
      }
    })
  }

  resetaEndereco(form: any) {
    form.form.patchValue({
      endereco: {
        complemento: null,
        rua: null,
        bairro:null,
        cidade: null,
        estado: null,
      }
    })
  }

  resetaForm(form: any) {
    form.form.patchValue({
      nome: null,
      email: null,
      endereco: {
        cep: null,
        complemento: null,
        rua: null,
        bairro:null,
        cidade: null,
        estado: null,
      }
    })
  }

  ngOnDestroy() {
    this.inscricao_EstadoBr.unsubscribe()
    console.log('Destruido Form Tamplate');
  }

}
