import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxMaskModule, IConfig } from 'ngx-mask'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateDrivenComponent } from './formularios/template-driven/template-driven.component';
import { DataDrivenComponent } from './formularios/data-driven/data-driven.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDebuggerComponent } from './form-debugger/form-debugger.component';
import { CadastroContatoComponent } from './formularios/cadastro-contato/cadastro-contato.component';

@NgModule({
  declarations: [
    AppComponent,
    TemplateDrivenComponent,
    DataDrivenComponent,
    FormDebuggerComponent,
    CadastroContatoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TooltipModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
