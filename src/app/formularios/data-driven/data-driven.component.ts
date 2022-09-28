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
  public tecnologias!: any[]

  constructor(
    private builder: FormBuilder,
    private dropdownService: DropdownService,
    private consultaCepService: ConsultaCepService,
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
      }),
      cargos: [null],
      tecnologias: [null],
    })

    this.estadoBr = this.dropdownService.getEstadosBr()
    this.cargos = this.dropdownService.getCargos()
    this.tecnologias = this.dropdownService.getTecnologias()
  }

  setCargo() {
    const cargo = {nome: 'DevP', nivel: 'Pleno', desc: 'Dev Pl'}

    this.formDD.get('cargos')?.setValue(cargo)
  }

  compararCargos(ob1: any, ob2: any) {
    return ob1 && ob2 ? (ob1.nome === ob2.nome && ob1.nivel === ob2.nivel) : ob1 === ob2
  }

  onSubmit() {
    if (this.formDD.valid) {
      console.log(this.formDD)
      // this.resetForm()
    } else {
      this.verificaValidacoesForm(this.formDD)
    }
  }

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
