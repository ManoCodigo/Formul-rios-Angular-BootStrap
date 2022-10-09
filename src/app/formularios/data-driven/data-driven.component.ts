import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { IEstadosBr } from 'src/app/model/i-estados-br';
import { ConsultaCepService } from 'src/app/service/consulta-cep.service';
import { DropdownService } from 'src/app/service/dropdown.service';

@Component({
  selector: 'app-data-driven',
  templateUrl: './data-driven.component.html',
  styleUrls: ['./data-driven.component.scss']
})
export class DataDrivenComponent implements OnInit {

  public formDD!: FormGroup;
  public estadoBr!: Observable<IEstadosBr[]>

  public cargos!: any[]
  public newsletterOp!: any[]

  constructor(
    private builder: FormBuilder,
    private dropdownService: DropdownService,
    private consultaCepService: ConsultaCepService,
  ) { }


  ngOnInit(): void {
    this.formulario()

    this.estadoBr = this.dropdownService.getEstadosBr()
    this.cargos = this.dropdownService.getCargos()
    this.newsletterOp = this.dropdownService.getNewlestter()
  }

  formulario() {
    this.formDD = this.builder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      telefone: [null, Validators.required],
      endereco: this.builder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        rua: [null, Validators.required],
        complemento: [null],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
      }),
      cargos: [null, Validators.required],
      newsletter: ['sim'],
      termos: [null, Validators.required],
    })
  }

  onSubmit() {
    if (this.formDD.valid) {
      console.log(this.formDD.value)
      this.resetForm()
    } else {
      this.verificaValidacoesForm(this.formDD)
    }
  }

  onConsultaCEP() {
    const cep = this.formDD.get('endereco.cep')?.value
    this.resetaEndereco()
    if (cep != null && cep !== '') {

      this.consultaCepService.consultaCEP(cep)?.subscribe(
        (dados: any) => this.populaDados(dados)

        )
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


  validacoes(campo: any) {
    return this.formDD.get(campo)?.invalid && this.formDD.get(campo)?.touched
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

  resetForm() {
    this.formDD.reset()
  }

  resetaEndereco() {
    // this.formDD.get('endereco')?.reset()
    this.formDD.patchValue({
      endereco: {
        numero: null,
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null,
      }
  })
  }
}
