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
  public naoEncontrado: boolean = false
  public estadoBr!: Observable<IEstadosBr[]>

  public cargos!: any[]
  public newsletterOp!: any[]

  constructor(
    private builder: FormBuilder,
    private dropdownService: DropdownService,
    private consultaCepService: ConsultaCepService,
  ) { }

  ngOnInit(): void {
    // this.formDD.reset()

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
      }),
      cargos: [null],
      termos: [null],
      newsletter: [null],
    })

    this.estadoBr = this.dropdownService.getEstadosBr()
    this.cargos = this.dropdownService.getCargos()
    this.newsletterOp = this.dropdownService.getNewlestter()
  }

  onSubmit() {
    if (this.formDD.valid) {
      console.log(this.formDD.value)
      // this.resetForm()
    } else {
      this.verificaValidacoesForm(this.formDD)
    }
  }
  // 60748-540
  onConsultaCEP() {
    const cep = this.formDD.get('endereco.cep')?.value

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

  resetForm() {
    this.formDD.reset()
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
