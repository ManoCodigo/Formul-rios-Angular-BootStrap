import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-driven',
  templateUrl: './data-driven.component.html',
  styleUrls: ['./data-driven.component.scss']
})
export class DataDrivenComponent implements OnInit {

  public formDD!: FormGroup;
  public naoEncontrado: boolean = false

  constructor(
    private builder: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    // OUTRA FORMA
    // this.formDD = new FormGroup({
    //   nome: new FormControl(null),
    //   email: new FormControl(null),
    //   endereco: new FormGroup({
    //     cep: new FormControl(null),
    //     numero: new FormControl(null),
    //     rua: new FormControl(null),
    //     emcomplementoail: new FormControl(null),
    //   })
    // })

    this.formDD = this.builder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      endereco: this.builder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        rua: [null, Validators.required],
        complemento: [null],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
      })
    })
  }

  onSubmit() {
    if (this.formDD.valid) {
      console.log(this.formDD)
      // this.resetForm()
    } else {
      this.verificaValidacoesForm(this.formDD)
    }
  }

  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo)
      controle?.markAsTouched()
      if (controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle)
      }
    })
  }

  resetForm() {
    this.formDD.reset()
  }

  validacoes(campo: any) {
    return this.formDD.get(campo)?.invalid && this.formDD.get(campo)?.touched
  }

  consultaCEP() {
    //https://viacep.com.br/
    //Nova variável "cep" somente com dígitos.
    let cep = this.formDD.get('endereco.cep')?.value
    cep = cep.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep == "") {
      this.resetaEndereco()
    }
    if (cep != "") {
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if(validacep.test(cep)) {
        this.http.get(`https://viacep.com.br/ws/${cep}/json`)
        .subscribe( res => {
          this.populaDados(res)
          this.naoEncontrado = false
        })
      } else {
        this.naoEncontrado = true
        this.resetaEndereco()
      }
    }
  }

  populaDados(dados: any) {
    this.formDD.patchValue({
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

  resetaEndereco() {
    this.formDD.patchValue({
      endereco: {
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null,
      }
  })
  }
}
