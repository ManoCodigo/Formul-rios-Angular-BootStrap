import { IEstadosBr } from './../../model/i-estados-br';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropdownService } from 'src/app/service/dropdown.service';
import { ConsultaCepService } from 'src/app/service/consulta-cep.service';

@Component({
  selector: 'app-cadastro-contato',
  templateUrl: './cadastro-contato.component.html',
  styleUrls: ['./cadastro-contato.component.scss']
})
export class CadastroContatoComponent implements OnInit {

  public cadastroContato!: FormGroup

  public estadoBr!: Observable<IEstadosBr[]>
  public estadoCivil!: any[]
  public escolaridade!: any[]

  constructor(
    private builder: FormBuilder,
    private dropdownService: DropdownService,
    private consultaCepService: ConsultaCepService
  ) { }

  ngOnInit(): void {
    this.onCadastroContato()

    this.estadoBr = this.dropdownService.getEstadosBr()
    this.estadoCivil = this.dropdownService.getEstadoCivil()
    this.escolaridade = this.dropdownService.getEscolaridade()
  }

  onCadastroContato() {
    this.cadastroContato = this.builder.group({
      nome: [null, Validators.required],
      telefone: [null, Validators.required],
      email: [null, Validators.required],
      confirmarEmail: [null, Validators.required],
      dataNasc: [null, Validators.required],
      cpf: [null, Validators.required],
      estadoCivil: [null, Validators.required],
      endereco: this.builder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        rua: [null, Validators.required],
        complemento: [null],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
      }),
      escolaridade:  [null, Validators.required],
      prentSalarial: [null, Validators.required],
      marcarReuniao: [null, Validators.required],
      termos: [null, Validators.required],
    })
  }

  onCadastrar() {
    console.log('Cadastrado');
    console.log(this.cadastroContato.value);
  }

  onConsultaCEP() {
    const cep = this.cadastroContato.get('endereco.cep')?.value

    this.consultaCepService.consultaCEP(cep)?.subscribe(
      dados => this.onPopulaCEP(dados)
    )
  }

  onPopulaCEP(dados: any) {
    this.cadastroContato.patchValue({
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

  onValidacoes(campo: string) {
    return this.cadastroContato.get(campo)?.invalid && this.cadastroContato.get(campo)?.touched
  }

  onResetForm() {
    this.cadastroContato.reset()
  }
}
