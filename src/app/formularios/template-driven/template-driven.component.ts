import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-driven',
  templateUrl: './template-driven.component.html',
  styleUrls: ['./template-driven.component.scss']
})
export class TemplateDrivenComponent implements OnInit {

  public naoEncontrado: boolean = false

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  public onEnviar(form: any) {
    console.log(form.value)
    form.reset()
  }

  validacoes(compa: any) {
    return !compa.valid && compa.touched
  }

  consultaCep(cep: any, form: any) {
    //https://viacep.com.br/
    //Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep == "") {
      this.resetaEndereco(form)
    }
    if (cep != "") {
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if(validacep.test(cep)) {
        this.http.get(`https://viacep.com.br/ws/${cep}/json`)
        .subscribe( res => {
          this.populaDados(res, form)
          this.naoEncontrado = false
        })
      } else {
        this.naoEncontrado = true
        this.resetaEndereco(form)
      }
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

}
