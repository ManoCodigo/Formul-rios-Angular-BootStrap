import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-driven',
  templateUrl: './template-driven.component.html',
  styleUrls: ['./template-driven.component.scss']
})
export class TemplateDrivenComponent implements OnInit {

  usuario: any = {
    nome: 'Lucas',
    email: 'lucas@email.com'
  }

  constructor() { }

  ngOnInit(): void {
  }

  public onEnviar(form: any) {
    console.log(form)
    console.log(this.usuario)

  }

}
